<template>
  <div>
    <LoadingIcon :loading="loading" ></LoadingIcon>
    <b-row class="tweet_rows" v-if="!loading">
      <b-col
        v-for="(tweet, index) in tweets"
        :key="index"
        cols="12"
        lg="3"
        sm="6"
        md="4"
      >
        <UserTweet
          :tweet="tweet"
          :type="type"
          @hidePost="hideTweet"
        ></UserTweet>
      </b-col>
    </b-row>

    <div id="pagination_component">


    <PaginationComponent
      :pages="pages"
      :currentpage="page"
    ></PaginationComponent>

  </div>
  </div>
</template>

<script>
import UserTweet from "@/components/Tweet.vue";
import LoadingIcon from '@/components/Utils/Loading.vue'
import PaginationComponent from "@/components/Utils/Pagination.vue";
import {
  getEmerRespondedTweets,
  getEmerNotRespondedTweets,
} from "@/services/tweets";


export default {
  name: "emergencyTweets",
  components: { UserTweet, PaginationComponent ,LoadingIcon},

  data() {
    return {
      tweets: [],
      show: "",
      type: "Emergency",
      pages: 5,
      page: 1,
      currentpage: this.$route.query.page || 1,
      pagelimit: 8,
      loading:true
    };
  },
  methods: {
    hideTweet(id) {
      this.tweets = this.tweets.filter((tweet) => {
        const tid = JSON.parse(tweet.tweet_ID).$oid;
        return tid != id;
      });
    },
    async showTweets() {
      // console.log("show tweets")
      if (this.$route.query.search != "responded") {
        let tweets = await getEmerNotRespondedTweets(
          this.currentpage,
          this.pagelimit
        );

        this.pages = tweets.data.pages;
        tweets = tweets.data.posts;

        this.tweets = tweets;
      } else if (this.$route.query.search == "responded") {
        let tweets = await getEmerRespondedTweets(
          this.currentpage,
          this.pagelimit
        );

        this.pages = tweets.data.pages;
        tweets = tweets.data.posts;

        this.tweets = tweets;
      
   
      }
      this.loading=false;
    },
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
  },
};
</script>

<style>
#pagination_component {
  margin-top: 15px;
}
</style>
