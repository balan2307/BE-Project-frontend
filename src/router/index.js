import AllTweets from '@/components/AllTweets'
import  Router from 'vue-router'
import Emergency from '@/components/TweetSection/emergencyTweets.vue'
import Feedback from '@/components/TweetSection/feedbackTweets.vue'
import AuthPage from '@/components/Auth/Userauth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// import {getAuth } from "firebase/auth"
// import store from 'store'

const router=new Router({

    mode:'history',
    routes:[
        {
            name:'AllTweets',
            meta:{
                requiresAuth:true

            },
            path:'/',
            redirect: '/emergency',
            components:{
                'main':AllTweets
            },
            children:[
                {
                    name:'EmeregencySection',
                    path:'emergency',
                    component:Emergency
                },
                   {
                    name:'FeedbackSection',
                    path:'feedback',
                    component:Feedback
                }
            ]


        },
        {
            name:'Register',
            path:'/auth',
            components:{
                auth:AuthPage
            }
        },
        {
            name:'Login',
            path:'/auth',
            components:{
                auth:AuthPage
            }

        
        }

    ]


})



router.beforeEach(async(to, from, next) => {
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = await firebase.auth().currentUser;
    console.log("isauthenticated guard", isAuthenticated,firebase.auth());
    if (requiresAuth && !isAuthenticated) {

        console.log("stop")
      next("/auth");
    } else {
      next();
    }

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (requiresAuth && !user) {
    //       next('/login');
    //     } else {
    //       next();
    //     }
    //   });



  });
export default router;