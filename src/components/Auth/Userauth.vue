<template>
  <div id="login">
    <div id="authimage">

    </div>
    <div id="form-main">
      <p id="authtype">{{ this.mode }}</p>

      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="authform">
        <b-form-group class="form-input" id="input-group-1" label-for="input-1">
          <!-- <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input> -->
          <InputField
          v-model="user.email"
          :class="{ invalid: $v.user.email.$error }"
          @blur="$v.user.email.$touch()"
          type="email"
          placeholder="Email"
        ></InputField>
        <p class="feedback" v-if="!$v.user.email.email">
          Please provide a valid email address
        </p>
        <p
          class="feedback"
          v-if="!$v.user.email.required && $v.user.email.$anyError"
        >
          Email cannot be empty
        </p>
        </b-form-group>

        <b-form-group class="form-input" id="input-group-2" label-for="input-2">

        
          <InputField
        type="password"
        v-model="user.password"
        placeholder="Password"
        :class="{ invalid: $v.user.password.$error }"
        @blur="$v.user.password.$touch()"
        @visited="setVisited"
      ></InputField>

      <p
          class="feedback"
          v-if="!$v.user.password.minLength && $v.user.password.$error"
        >
          Password should be atleast
          {{ $v.user.password.$params.minLength.min }} characters
        </p>
        <p
          class="feedback"
          v-if="!$v.user.password.containsUppercase && $v.user.password.$error"
        >
          Password should contain atleast 1 Uppercase character
        </p>
        <p
          class="feedback"
          v-if="!$v.user.password.containsLowercase && $v.user.password.$error"
        >
          Password should contain atleast 1 Lowercase character
        </p>
        <p
          class="feedback"
          v-if="!$v.user.password.containsNumber && $v.user.password.$error"
        >
          Password should contain atleast 1 digit
        </p>
        <p
          class="feedback"
          v-if="!$v.user.password.containsSpecial && $v.user.password.$error"
        >
          Password should contain atleast 1 special character
        </p>
   
        </b-form-group>

        <div id="submit-section">
          <b-button id="submit-btn" type="submit" variant="primary">{{
            changeSubmitBtnCaption
          }}</b-button>

          <p id="alter-auth" @click="changeAuth" >{{
            changeSwitchAuthBtnCaption
          }}</p>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
//   import {LoginUser} from '@/services/auth'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import InputField from '@/components/Utils/Forms/Input.vue'
import { required, email,minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { eventBus } from "@/main";

export default {
  name: "AuthPage",
  components:{InputField},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      mode: "login",
      show: true,
      // authtype: 'login'
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
        containsSpecial: function (value) {
          return /[#?!@$%^&*-]/.test(value);
        },
        
      },
    },
  },
  computed: {
    ...mapGetters(["getAuthtype"]),
    ...mapState(["authtype"]),

    changeSubmitBtnCaption() {
      if (this.mode == "login") return "Login";
      else return "SignUp";
    },
    changeSwitchAuthBtnCaption() {
      if (this.mode == "login") return "SignUp Instead";
      else return "Login Instead";
    },
  },
  created() {
    eventBus.$on("setAuth", (data) => {
      console.log("inside bus");
      this.mode = data;
    });
    console.log("check store", this.getAuthtype);
    this.mode = this.getAuthtype;
  },
  methods: {
    setVisited() {
      this.touched = true;
    },
    changeAuth() {
      if (this.mode == "login") {
        this.mode = "signup";
      } else if (this.mode == "signup") {
        this.mode = "login";
      }
      console.log("change", this.mode);
    },
    async onSubmit(event) {
      event.preventDefault();

      console.log("form", JSON.stringify(this.form));
      //  await LoginUser(this.form.email,this.form.password)

      if (this.mode == "login" && !this.$v.user.$invalid)
        signInWithEmailAndPassword(
          getAuth(),
          this.user.email,
          this.user.password
        )
          .then((data) => {
            console.log("login successfully", data);

            this.$router.push("/emergency");
          })
          .catch((err) => {

            let errormessage='';
            if(err.code=="auth/wrong-password" || err.code=="auth/user-not-found") errormessage="Entered email or password is incorrect"
            if(err.code=="auth/too-many-requests") errormessage="Too many login attempts ,try again after sometime"
            eventBus.$emit("alert",errormessage);
            console.log("error ", err,err.code);
          });
      else if(this.mode == "signup" && !this.$v.user.$invalid)
        createUserWithEmailAndPassword(
          getAuth(),
          this.user.email,
          this.user.password
        )
          .then((data) => {
            console.log("register successfully", data);
            eventBus.$emit("setAuth",'login')
          })
      

          .catch((err) => {
            let errormessage='';
            if(err.code=="auth/email-already-in-use" ) errormessage="Email already in use"
            if(err.code=="auth/too-many-requests") errormessage="Too many login attempts ,try again after sometime"
            eventBus.$emit("alert",errormessage);
            console.log("error ", err);
          });

      // try
      // {
      // this.$store
      //   .dispatch("login",{
      //     email:this.form.email,
      //     password:this.form.password
      //   })

      //   this.$router.replace("/emergency");
      // }
      // catch(err)
      // {
      //   console.log("logine rr",err)
      // }
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Cabin&family=Merriweather:wght@300&family=Nunito:wght@300&family=Righteous&family=Rubik&family=Ubuntu:wght@300&display=swap');


*{
 font-family: 'Ubuntu', sans-serif;
}
#submit-section {
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
}
label {
  text-align: left;
}

#login {
  width: 60%;
  height: 70%;
  display: flex;
  border: 1px solid rgb(231, 222, 222);
}

#form-main {
  border-left: 1px solid #e9e9e9;
  padding: 10px;
  width: 50%;
  padding-top: 10px;
  background-color: #f0f0f0;
}

#authimage
{
  width: 50%;
}

#authtype {
  font-weight: bold;
  font-size: 1.5em;
}

.form-input {
  display: flex;
  justify-content: center;
}

#submit-btn {
  font-size: 15px;
  /* border-radius: 25px; */
}

#authform
{
  padding-top: 20px;
}

#alter-auth
{
  border: none;
    background-color: #ffffff00;
    font-weight: 600;
    color: #5a5a5a;
    outline: none!important;
    margin-top: 5px;
    cursor: pointer;

  
}

#alter-auth:active {
  outline: none;
  border: none;

}

#alter-auth:focus {
  outline: none!important;
  border: none!important;
  /* background-color: rgb(136, 180, 55); */
}

#authimage {  
    background: url('@/assets/train.jpg') no-repeat;
    background-size: 100%;
    background-position: center;
}

.feedback 
{
  color: red;
  text-align: left;
  margin: 0;
    font-size: 0.8em;
    font-weight: bold;

}

.form-input{
  display: block;
}
@media (min-width: 1065px) {

  #login {
  width: 50%;
  height: 80%;
 
}

}

@media (max-width: 1065px) {

#login {

height: 80%;

}

}



@media (max-width: 820px) {

#login {
width: 80%;
height: 80%;

}

}

@media (max-width: 600px) {

#authimage {
  display: none;

}

#login {
width: 80%;
height: 80%;

}

#form-main {
width: 100%;

}

}


@media (max-width: 480px) {


/* #submit-section{

  flex-direction: column;
  gap: 20px;


} */

/* #submit-btn,#alter-auth
{
  width: 50%;

} */

}
</style>
