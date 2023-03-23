<template>
  <div id="register">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
// import {RegisterUser} from '@/services/auth'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      //   alert(JSON.stringify(this.form))
      console.log("form", JSON.stringify(this.form));
      createUserWithEmailAndPassword(
        getAuth(),
        this.form.email,
        this.form.password
      )
        .then((data) => {
          console.log("register successfully", data);
          this.$router.push('/auth')
        })
        .catch((err) => {
          console.log("error ", err);
        });

      // this.$store
      //   .dispatch("signup",{
      //     email:this.form.email,
      //     password:this.form.password
      //   })
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
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
label {
  text-align: left;
}

#register {
  width: 60%;
}
</style>
