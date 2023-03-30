<template>
   <b-card
      img-alt="Image"
      img-top
      tag="article" >
      <span class="tweet_header" >{{type}}</span>
    
      <div class="p-3 tweet_content">
      <b-card-text class="tweet_data">
       {{ tweet.tweet }}
      </b-card-text>
     
      <div class="reply" v-if="tweet.responded">

        <p class="admin-reply">{{ tweet.reply[0] }}</p>

      </div>


      <div class="message" v-if="!tweet.responded">
        <div>
          <img class="reply_button" src="@/assets/message.svg" @click="toggleReply" />
        </div>

        <transition name="fade">
        <div style="width: 100%" v-if="showMsgBox">
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            class="tweet_reply"
            v-model="reply"
          ></b-form-textarea>

          <div class="sendBtn" @click="sendReply">
            <img class="send_button" src="@/assets/send.svg" />
          </div>
        </div>
    </transition>
      </div>
      </div>
    </b-card>
</template>

<script>
import {postReply} from '@/services/tweets'
import { eventBus } from "@/main";

export default {
    name:'UserTweet',
    props:["tweet","type"],
    data()
  {
    return{
      showMsgBox:false,
      reply:'',

    }

  },
  methods:{

    toggleReply()
    {
      this.showMsgBox=!this.showMsgBox;
      return this.showMsgBox;

      
    },
    async sendReply()
    {

    
     
      const reply=this.reply;

      this.reply=" ";
      this.toggleReply();
      const tid= JSON.parse(this.tweet.tweet_ID).$oid;
      const pid=this.tweet._id;
      this.$emit("hidePost",tid);


      eventBus.$emit("replysent", {message:"Reply sent successfully"});
      await postReply(tid,pid,reply)

      
   
    }

  },
  created(){


    

  }


}
</script>

<style>

.admin-reply{
  font-weight: 600;
  display: flex;
  color: #727272;
}
.tweet_data
{

    text-align: left;
}
.tweet_content
{

    
    background-color: rgb(242 242 242);
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}

.card,.card-body{
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
}

.card-body{
    background-color: rgb(241, 240, 239);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.tweet_header
{
  font-weight: 600;
  width: 100%;
  padding: 4px;
  display: inline-block;
      background-color: #b36666d6;
    color: #fbfbfb;
}



.tweet_reply::-webkit-scrollbar {
  display: none;
}

.tweet_reply {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.send_button {
  width: 30px;
}
.reply_button {
  width: 30px;

  display: flex;

  align-self: flex-start;
}

.card-body
{
  width: 100%;
}
.sendBtn {
  display: flex;
  justify-content: flex-end;
}
.message {
  display: flex;
}

.card-body
{
    padding: 0;
}


#tab {
  display: flex;
  justify-content: space-evenly;
}

#tab1 a,
#tab2 a {
  color: rgb(14, 13, 13);
  text-decoration: none;
}

#tab1,
#tab2 {
  width: 50%;
  text-align: center;
  padding: 3px;
  border: 1px solid rgb(218, 211, 211);
  border-radius: 8px;
  background-color: white;
}

#tab1 {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#tab2 {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#tab1:hover,
#tab2:hover {
  background-color: rgb(201, 211, 211);
}

.a-active {
  color: rgb(255, 255, 255) !important;
  text-decoration: none;
}

.active {
  background-color: #848f8b !important;
}


.tab-name {
  font-weight: 500;
  font-size: 1.2em;
}


</style>