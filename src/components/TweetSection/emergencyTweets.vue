<template>
  <div>
    <b-row class="tweet_rows">
      <b-col
        v-for="(tweet, index) in tweets"
        :key="index"
        cols="12"
        lg="3"
        sm="6"
        md="4"
      >
        <UserTweet :tweet="tweet" :type="type" @hidePost="hideTweet"></UserTweet>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UserTweet from "@/components/Tweet.vue";
import { getTweets } from "@/services/tweets";
import { eventBus } from "@/main";

export default {
  name: "emergencyTweets",
  components: { UserTweet },

  data() {
    return {
      tweets: [],
      show: "",
      type:"Emergency"
    };
  },
  methods: {
    hideTweet(id) {
      console.log("ID", id);
      this.tweets = this.tweets.filter((tweet) => {
        const tid = JSON.parse(tweet.tweet_ID).$oid;
        return tid != id;
      });
    },
    async showTweets() {
      let tweets = await getTweets();
      tweets = tweets.data;
      if (this.show != "Responded") tweets = tweets.filter(
          (tweet) => tweet.Type == "Emergency" && !tweet.responded
        );
      else tweets = tweets.filter(
          (tweet) => tweet.Type == "Emergency" && tweet.responded
        );

      this.tweets = tweets;
    },
  },
  async created() {
    this.showTweets();
    setInterval(this.showTweets, 3000);

    eventBus.$on("emergency", (data) => {
      this.show = data;
      this.showTweets();

    });
  },
};
</script>

<style></style>
