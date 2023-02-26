import axios from 'axios'
import { successHandler, errorHandler } from "./helper";

export const getTweets=async function(){


   
  return axios.get(`http://localhost:3000/listings`).then(successHandler).catch(errorHandler);



}