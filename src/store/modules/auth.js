import axios from 'axios'

const auth = {
  state: {

        userId:null,
        token:null,
        tokenExpiration:null,
        isLoggedIn:false,
        authtype:'login'
    
  },
  getters: {

    isAuthenticated(state)
    {
      return state.isLoggedIn
    },
    getAuthtype(state)
    {
      return state.authtype
    }
  },
  mutations: {

    setAuthtype(state,auth)
    {
      
      state.authtype=auth
      console.log("setting",state.authtype)
      
    },
    setUser(state,payload)
    {
        state.token=payload.token;
        state.userId=payload.userId;
        state.tokenExpiration=payload.tokenExpiration
    },
    setisAuthenticated(state,setval)
    {
      console.log("store val",setval)
      state.isLoggedIn=setval
    }

  },

  actions: {
    async signup(context, payload) {
      const response=await axios
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCir46VWSyRYXgIKkAtHE05IukR9N4xjLg", {
            email: payload.email,
            password:payload.password,
            returnSecureToken: true
          },
        )

   
        const responseData=await response.data;
      
  
        if(response.status < 200 || response.status >= 300)
        {
            console.log("error",responseData)

        }
        else
        {
        console.log("Response firebase",responseData)
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expiresIn
        })
    }

    }
    ,
    async login(context, payload) {

      let response=null;
      try{
       response=await axios
        .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCir46VWSyRYXgIKkAtHE05IukR9N4xjLg", {
            email: payload.email,
            password:payload.password,
            returnSecureToken: true
          },
        )
      }
      catch(err)
      {
        console.log("state login err",err)
      }

   
        const responseData=await response.data;
        console.log("login res",responseData)
      
  
        if(response.status < 200 || response.status >= 300)
        {
            console.log("error",responseData)

        }
        else
        {
        console.log("Response firebase",responseData)
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expiresIn
        })
    }

    }

  },
};

export default auth;
