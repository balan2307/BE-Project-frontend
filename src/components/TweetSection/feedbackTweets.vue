<template>
   
    <div>
        <LoadingIcon :loading="loading"></LoadingIcon>
    

        <b-row class="tweet_rows" v-if="!loading">
            <b-col v-for="(tweet, index) in tweets" :key="index" cols="12" lg="3" sm="6" md="4">
                <UserTweet :tweet="tweet" :type="type" @hidePost="hideTweet"></UserTweet>

            </b-col>


        </b-row>

        <div id="pagination_component">
        <PaginationComponent :pages="pages" :currentpage="page"></PaginationComponent>
        </div>
    </div>
</template>

<script>

import PaginationComponent from "@/components/Utils/Pagination.vue";
import LoadingIcon from '@/components/Utils/Loading.vue'
import { getFeedbackNotRespondedTweets, getFeedbackRespondedTweets } from '@/services/tweets'
import UserTweet from '@/components/Tweet.vue'


export default {
    name: 'feedbackTweets',
    components: { UserTweet, PaginationComponent,LoadingIcon },
    data() {
        return {
            tweets: [],
            show: '',
            type: 'Feedback',
            pages: 5,
            page: 1,
            currentpage: this.$route.query.page || 1,
            pagelimit: 8,
            loading:true

        }

    },
    methods: {

        hideTweet(id) {

            this.tweets = this.tweets.filter(tweet => {

                const tid = JSON.parse(tweet.tweet_ID).$oid;
                return tid != id
            })

        },

        async showTweets() {



            if (this.$route.query.search != "responded") {
        let tweets = await getFeedbackNotRespondedTweets(
          this.currentpage,
          this.pagelimit
        );

      

        this.pages = tweets.data.pages;
        tweets = tweets.data.posts;

        this.tweets = tweets;
      } else if (this.$route.query.search == "responded") {

        let tweets = await getFeedbackRespondedTweets(
          this.currentpage,
          this.pagelimit
        );
      

        this.pages = tweets.data.pages;
        tweets = tweets.data.posts;

        this.tweets = tweets;
      }
      this.loading=false



        }



    },
    async created() {

        this.loading=true;
        this.showTweets();

    let intervalID = setInterval(this.showTweets, 3000);
    // console.log("setInterval", intervalID);

    this.$once("hook:beforeDestroy", () => {
      // console.log("clear", intervalID);
      clearInterval(intervalID);
    });



    }

}
</script>



<style>
#pagination_component {
  margin-top: 15px;
}
</style>