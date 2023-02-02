import AllTweets from '@/components/AllTweets'
import  Router from 'vue-router'

const router=new Router({

    mode:'history',
    routes:[
        {
            name:'AllTweets',
            path:'/',
            component:AllTweets


        }

    ]


})

export default router;