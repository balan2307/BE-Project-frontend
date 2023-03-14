<template>
  <div id="allTweets">

    <div id="tab">
        <div id="tab1" :class="tab1active" >
          <span class="tab-name" >
            <router-link :class="link1active" to="/emergency">
              Emergency</router-link
            >
          </span>
        </div>

        <div id="tab2" :class="tab2active">
          <span class="tab-name" 
            ><router-link :class="link2active" to="/feedback">
              Feedback</router-link
            ></span
          >
        </div>
      </div>

      <div class="dropdown">

  <b-dropdown split id="emergencyDropdown" :text="edmropdown" class="m-md-2" >

    <b-dropdown-item  @click="changeView">Responded</b-dropdown-item>
    <b-dropdown-item  @click="changeView"> Not Responded</b-dropdown-item>
  </b-dropdown>
</div>

      <router-view :key="$route.fullPath"></router-view>



   
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "AllTweets",
  data()
  {
    return{
      tab1active: "",
      tab2active: "",
      link1active: "",
      link2active: "",
      edmropdown:'Not Responded'
    }
  },
  methods:{
    // optionsChanged()
    // {

    //   console.log("options changed")
    // },
    changeView(event)
    {
  
      const show=event.target.textContent;
      this.edmropdown=show
      if(this.$route.path == "/emergency" )
      {
     

        eventBus.$emit("emergency",show);

      }
      else
      {
    
        eventBus.$emit("feedback",show);

      }

    }
  },
  created()
  {

    if (this.$route.path == "/emergency") {
     
      this.tab1active = "active";
      this.tab2active = "";
      this.link1active = "a-active";
      this.link2active = "";
    } else {

      
      this.tab2active = "active";
      this.tab1active = "";
      this.link2active = "a-active";
      this.link1active = "";
    }
  },
  mounted() {
 
  }


};
</script>

<style>
/* #emergencyDropdown .btn-group > .btn{

  flex: 0!important;
} */

html { 
    height:100%;
}
body { 
    min-height:100%;
  
}

html,body {
  margin:0;
  padding:0;
  overflow-x:hidden;
}
.dropdown{
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}
.tab-name a{
  width: 100%;
    display: block;
}
#allTweets {
  /* border: 1px solid red; */
  width: 90%;
}

.row {
  display: flex; /* use Flexbox for the row */
  flex-wrap: wrap; /* wrap the cards to the next row if needed */
}

.card {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  
}

.tweet_rows
{
  row-gap: 20px;
  margin-top: 50px;
}
</style>
