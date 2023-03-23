import {getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"


export const RegisterUser=function(email,password){

    createUserWithEmailAndPassword(getAuth(),email,password)
    .then((data)=>{
        console.log("register successfully",data)
    })
    .catch((err)=>{
        console.log("error ",err)
    })

}

export const LoginUser=function(email,password){

    
    signInWithEmailAndPassword(getAuth(),email,password)
    .then((data)=>{
        console.log("login successfully",data)
        return
        
      
    })
    .catch((err)=>{
        console.log("error ",err)
    })

}