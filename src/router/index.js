import AllTweets from '@/components/AllTweets'
import  Router from 'vue-router'
import Emergency from '@/components/TweetSection/emergencyTweets.vue'
import Feedback from '@/components/TweetSection/feedbackTweets.vue'



const router=new Router({

    mode:'history',
    routes:[
        {
            name:'AllTweets',
            path:'/',
            redirect: '/emergency',
            component:AllTweets,
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


        }

    ]


})

export default router;