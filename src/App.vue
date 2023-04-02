<template>
  <div id="app">
    <navBar></navBar>

    <div id="main-content" v-if="!isOnAuthPage()">
      <router-view name="main" :key="$route.fullPath"></router-view>
    </div>

    <div id="auth" v-if="isOnAuthPage()">
      <AlertMessage
        ref="alertcomp"
        variant="warning"
        :message="errormessage"
      ></AlertMessage>

      <router-view :key="$route.fullPath" name="auth"></router-view>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import firebase from "firebase/compat/app";
import navBar from "@/components/Navbar.vue";
import { mapMutations, mapGetters } from "vuex";
import AlertMessage from "@/components/Utils/Alert.vue";

export default {
  name: "App",
  components: {
    navBar,
    AlertMessage,
  },
  data() {
    return {
      errormessage: "",
    };
  },
  methods: {
    ...mapMutations(["setisAuthenticated"]),
    isOnAuthPage() {
      return (
        this.$route.path == "/login" ||
        this.$route.path == "/register" ||
        this.$route.path == "/auth"
      );
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setisAuthenticated(true);
      } else {
        this.setisAuthenticated(false);
      }
      console.log("status", this.isAuthenticated, firebase.auth().currentUser);
    });
  },
  created() {
    console.log("inside app.vue")
    eventBus.$on("alert", (data) => {
      this.errormessage = data;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#main-content {
  display: flex;
  justify-content: center;
  /* margin-top: 100px; */
  /* height: 100%;
  padding-bottom: 20px; */
}

#auth {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f9;
}
</style>
