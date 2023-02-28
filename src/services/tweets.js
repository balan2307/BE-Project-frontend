import axios from 'axios'
import { successHandler, errorHandler } from "./helper";

export const getTweets=async function(){


   
  return axios.get(`http://localhost:3000/listings`).then(successHandler).catch(errorHandler);



}

async function login(){
   return axios.post(`https://ushareinteract-2.onrender.com/user/remote/login`,{'email':"esakki@gmail.com",'password':"esakki"},{ withCredentials: true }).then(successHandler).catch(errorHandler);
}

export const postReply=async function(id,reply){


  console.log("reply",reply)
 
  const res=await login();
  console.log("Response",res)
  return axios.post(`https://ushareinteract-2.onrender.com/user/post/${id}/comments`,{'comment':reply},{ withCredentials: true }).then(successHandler).catch(errorHandler);
}