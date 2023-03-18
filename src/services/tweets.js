import axios from 'axios'
import { successHandler, errorHandler } from "./helper";

export const getTweets=async function(){


   
  return axios.get(`http://localhost:3000/tweets`).then(successHandler).catch(errorHandler);



}

export const getEmerRespondedTweets=async function(currpage,perpage){


   
  return axios.get(`http://localhost:3000/emergency/resp`,{
    params: {
      page: currpage,
      limit: perpage,
    }}).then(successHandler).catch(errorHandler);

}

export const getEmerNotRespondedTweets=async function(currpage,perpage){


  return axios.get(`http://localhost:3000/emergency/unresp`,{
    params: {
      page: currpage,
      limit: perpage,
    }}).then(successHandler).catch(errorHandler);

}

export const getFeedbackNotRespondedTweets=async function(currpage,perpage){


  return axios.get(`http://localhost:3000/feedback/unresp`,{
    params: {
      page: currpage,
      limit: perpage,
    }}).then(successHandler).catch(errorHandler);

}

export const getFeedbackRespondedTweets=async function(currpage,perpage){


  return axios.get(`http://localhost:3000/feedback/resp`,{
    params: {
      page: currpage,
      limit: perpage,
    }}).then(successHandler).catch(errorHandler);

}



// async function login(){
//    return axios.post(`http://localhost:5000/user/remote/login`,{'email':"esakki@gmail.com",'password':"esakki"},{ withCredentials: true }).then(successHandler).catch(errorHandler);
// }

export const postReply=async function(tid,pid,reply){


  console.log("reply",reply)
 
  // const res=await login();
  // console.log("Response",res)
  axios.post(`http://localhost:3000/tweets/reply`,{'id':pid,'reply':reply}).then(successHandler).catch(errorHandler);

  console.log("post reply")

  return axios.post(`https://ushareinteract-2.onrender.com/user/post/${tid}/comments`,{'comment':reply},{ withCredentials: true ,
  headers: {
    'Authorization': 'Admin',
  }}).then(successHandler).catch(errorHandler);

 
}