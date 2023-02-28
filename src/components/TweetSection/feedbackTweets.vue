<template>
    <div>

    <b-row class="tweet_rows">
    <b-col   v-for="(tweet,index) in tweets"
      :key="index"
      cols="12"
      lg="3"
      sm="6"
      md="4" >  
      <UserTweet :tweet="tweet"></UserTweet></b-col>

   
  </b-row>
    </div>
 
</template>

<script>


import {getTweets} from '@/services/tweets'
import UserTweet from '@/components/Tweet.vue'
export default {
    name:'feedbackTweets',
    components:{UserTweet},
    data(){
        return{
            tweets:[]

        }

    },
    methods:{

        async showTweets()
        {

        let tweets=await getTweets();
        tweets=tweets.data;
        tweets=tweets.filter( tweet => tweet.prediction=="feedback")
        this.tweets=tweets
     

        }

        

    },
    async created(){
        
        this.showTweets();
        setInterval(this.showTweets, 500000);

     

    }

}
</script>



<style>

</style>