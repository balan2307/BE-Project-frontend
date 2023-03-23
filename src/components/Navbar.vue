<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">RGA</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item ><router-link to="/emergency"  >Home</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
        <b-nav-item v-if="!isAuthenticated" ><router-link to="/auth" @click.native="setAuth('signup')" >Register</router-link></b-nav-item>
        <b-nav-item v-if="!isAuthenticated" ><router-link to="/auth"  @click.native="setAuth('login')">Login</router-link></b-nav-item>
        <b-nav-item v-if="isAuthenticated" @click="logout"> Logout</b-nav-item>

        
   
       
      </b-navbar-nav>

        <!-- <b-nav-item-dropdown right>
        
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>

// import {getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
// import * as firebase from "firebase/app"
import { mapMutations,mapGetters  } from 'vuex';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import "firebase/auth"

import { eventBus } from "@/main";

export default {
    name:'navBar',
    computed:{
      ...mapGetters(['isAuthenticated'])
      

    },
    methods:{
      ...mapMutations(['setAuthtype']),
      logout()
      {
        console.log("logout",firebase.auth)
        firebase.auth().signOut().then(()=>{
          this.$router.push('/auth')
        })

      },
      setAuth(set)
      {

        console.log("setauth",set)
        eventBus.$emit("setAuth", set);
        this.setAuthtype(set)
        
      }
    }

}
</script>

<style>

a{
  color: #9a9da0;
}

a:hover{
  text-decoration: none;
  color: #e9ecf0;

}
</style>