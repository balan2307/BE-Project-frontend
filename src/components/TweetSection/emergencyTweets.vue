<template>
    <div>
        <b-row class="tweet_rows">
    <b-col  v-for="index in 6"
      :key="index"
      cols="12"
      lg="3"
      sm="6"
      md="4" >  <UserTweet></UserTweet></b-col>

   
  </b-row>
    </div>
 
</template>

<script>
import UserTweet from '@/components/Tweet.vue'

export default {
    name:'emergencyTweets',
    components:{UserTweet}

}
</script>

<style>

</style>