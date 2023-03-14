<template>
    <div>

    <b-row class="tweet_rows">
    <b-col   v-for="(tweet,index) in tweets"
      :key="index"
      cols="12"
      lg="3"
      sm="6"
      md="4" >  
      <UserTweet :tweet="tweet" :type="type" @hidePost="hideTweet" ></UserTweet>
      </b-col>

   
  </b-row>
    </div>
 
</template>

<script>


import {getTweets} from '@/services/tweets'
import UserTweet from '@/components/Tweet.vue'
import { eventBus } from "@/main";

export default {
    name:'feedbackTweets',
    components:{UserTweet},
    data(){
        return{
            tweets:[],
            show:'',
            type:'Feedback'

        }

    },
    methods:{

        hideTweet(id)
        {
          
            this.tweets=this.tweets.filter(tweet=>{

                const tid= JSON.parse(tweet.tweet_ID).$oid;
                return tid!=id
            })
        
        },

        async showTweets()
        {

        let tweets=await getTweets();
        tweets=tweets.data;
        if (this.show != "Responded")  tweets=tweets.filter( tweet => tweet.prediction=="feedback" && !tweet.responded)
        else  tweets=tweets.filter( tweet => tweet.prediction=="feedback" && tweet.responded)
        this.tweets=tweets
     

        }

        

    },
    async created(){
        
        this.showTweets();
        setInterval(this.showTweets, 3000);

        eventBus.$on("feedback", (data) => {
            this.show = data;
            this.showTweets();
   
    });

     

    }

}
</script>



<style>

</style>