<template>
  <div id="analysis">
    <div id="title">
      <!-- <h5>Dashboard</h5> -->
    </div>
  
    <LoadingIcon :loading="loading"></LoadingIcon>

    <div v-if="!loading">
      <div id="tab-stats">
        <div class="stats">
          <h6 class="tab-heading">Total Tweets</h6>
          <p class="numeric-data">
            {{ this.total_emergencyTweets + this.total_feedbackTweets }}
          </p>
        </div>

        <div class="stats">
          <h6 class="tab-heading">Emergency</h6>
          <p class="numeric-data">{{ this.total_emergencyTweets }}</p>
        </div>

        <div class="stats">
          <h6 class="tab-heading">Feedback</h6>
          <p class="numeric-data">{{ this.total_feedbackTweets }}</p>
        </div>
      </div>

      <div id="chartsec1">

        <div id="pie-chart">
          <h5 class="chart-heading">Tweets received </h5>
          <div v-if="data_avl">
            <PieChart :key="chart1" :data="data" :labels="labels"></PieChart>
          </div>
        </div>

        <div id="bar-chart">
          <div v-if="bardata_avl">
            <h5 class="chart-heading">Feedback Tweets </h5>
            <BarChart  :key="chart2" :data="bardata" :labels="barlabels" ></BarChart>
          </div>
        </div>
      </div>

      <div id="chartsec2">
        <div id="bar-chart2">
          <div v-if="emerdatavl">
            <h5 class="chart-heading">Emergency Tweets </h5>
            <BarChart
              :data="emergencybardata"
              :labels="emergencybarlabels"
              :key="chart3"
            ></BarChart>
          </div>
        </div>

        <div id="bar-chart3">
          <div v-if="emerdatavl && bardata_avl">
            <h5 class="chart-heading">Response Status </h5>
            <MultiBarchart :data="chartData" :labels="chartLabels"   :key="chart4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnalytics } from "@/services/tweets";

import PieChart from "@/components/Utils/PieChart.vue";
import BarChart from "@/components/Utils/BarChart.vue";
import MultiBarchart from "@/components/Utils/MultiBarchart.vue";
import LoadingIcon from '@/components/Utils/Loading.vue'

export default {
  name: "TweetAnalytics",
  components: { PieChart, BarChart, MultiBarchart ,LoadingIcon },
  data() {
    return {
      data: [this.total_emergencyTweets, this.total_feedbackTweets],
      labels: ["Emergency", "Feedback"],
      mbc:0,
      loading:true,
      chartData: [
        {
          name: "Responded",
          data: [
            this.total_emergencyTweetsResponded,
            this.total_feedbackTweetsResponded,
            this.total_emergencyTweetsResponded +
              this.total_feedbackTweetsResponded,
          ],
        },
        {
          name: "UnResponded",
          data: [
            this.total_emergencyTweetsUnResponded,
            this.total_feedbackTweetsUnResponded,
            this.total_emergencyTweetsUnResponded +
              this.total_feedbackTweetsUnResponded,
          ],
        },
      ],
      chartLabels: ["Emergency", "Feedback", "Total"],
      data_avl: false,
      bardata_avl: false,
      emerdatavl: false,
      total_emergencyTweets: null,
      total_feedbackTweets: null,
      total_emergencyTweetsResponded: null,
      total_emergencyTweetsUnResponded: null,
      total_feedbackTweetsResponded: null,
      total_feedbackTweetsUnResponded: null,

      total_postiveFeedback: null,
      total_negativeFeedback: null,

      total_medical: null,

      total_legal: null,

      total_supply: null,

      total_robbery: null,

      barlabels: ["Positive", "Negative"],

      bardata: [this.total_postiveFeedback, this.total_negativeFeedback],

      emergencybarlabels: ["Medical", "Legal", "Supply", "Robbery"],

      emergencybardata: [
        this.total_medical,
        this.total_legal,
        this.total_supply,
        this.total_robbery,
      ],
      renderchart1:false,
      renderchart2:false,
      renderchart3:false,
      renderchart4:false,
      chart1:0,
      chart2:0,
      chart3:0,
      chart4:0
    };
  },
  watch: {
    total_emergencyTweets(newValue, oldValue) {
      console.log("old e", oldValue, newValue);
      this.data[0] = newValue;
      this.renderchart1=true;
      this.renderchart3=true;
      this.renderchart4=true;

    },
    total_feedbackTweets(newValue, oldValue) {
      this.data[1] = newValue;
      console.log("old f", oldValue, this.data);
      this.data_avl = true;
      this.renderchart1=true;
      this.renderchart2=true;
      this.renderchart4=true;
    },

    total_postiveFeedback(newValue, oldValue) {
      console.log("old e", oldValue, newValue);
      this.bardata[0] = newValue;
      // this.renderchart2=true;
    },
    total_negativeFeedback(newValue, oldValue) {
      this.bardata[1] = newValue;
      console.log("old f", oldValue, this.data);
      this.bardata_avl = true;
      // this.renderchart2=true;
    },

    total_medical(newValue, oldValue) {
      this.emergencybardata[0] = newValue;
      console.log("old f", oldValue, this.data);
      // this.renderchart3=true;
    },

    total_legal(newValue, oldValue) {
      this.emergencybardata[1] = newValue;
      console.log("old f", oldValue, this.data);
      // this.renderchart3=true;
    },

    total_supply(newValue, oldValue) {
      this.emergencybardata[2] = newValue;
      console.log("old f", oldValue, this.data);
      // this.renderchart3=true;
    },

    total_robbery(newValue, oldValue) {
      this.emergencybardata[3] = newValue;
      console.log("old f", oldValue, this.data);
      this.emerdatavl = true;
      // this.renderchart3=true;
    },

    total_emergencyTweetsResponded(newValue, oldValue) {
      this.chartData[0].data[0] = newValue;
      console.log("old f", oldValue, this.data);
      // this.renderchart3=true;
      this.renderchart4=true;
      // this.renderchart4=true;
    },

    total_feedbackTweetsResponded(newValue, oldValue) {
      this.chartData[0].data[1] = newValue;

      this.chartData[0].data[2] =
        this.chartData[0].data[0] + this.chartData[0].data[1];

        // this.renderchart2=true;
      this.renderchart4=true;
      console.log("old f", oldValue, this.data);
      // this.renderchart4=true;
    },

    total_emergencyTweetsUnResponded(newValue, oldValue) {
      this.chartData[1].data[0] = newValue;
      this.mbc+=1;
      console.log("old f", oldValue, this.data);
      // this.renderchart4=true;
    },

    total_feedbackTweetsUnResponded(newValue, oldValue) {
      this.chartData[1].data[1] = newValue;

      this.chartData[1].data[2] =
        this.chartData[1].data[0] + this.chartData[1].data[1];
      console.log("old f", oldValue, this.data);
      // this.renderchart4=true;
  
    },

    renderchart1()
    {
      this.chart1+=1;
      this.renderchart1=false
      // if(this.renderchart1) this.renderchart2=false
    },
    renderchart2()
    {
      this.chart2+=1;
      this.renderchart2=false
    },
    renderchart3()
    {
      this.chart3+=1;
      this.renderchart3=false
    },
    renderchart4()
    {
      this.chart4+=1;
      this.renderchart4=false
    }


  },
  methods:{

    async showCharts()
    {
     
      const res = await getAnalytics();
    console.log("analysis resp", res);

    const emergencyTweets = res.data.emergency;
    const feedbackTweets = res.data.feedback;

    this.total_emergencyTweets = emergencyTweets.length;
    this.total_feedbackTweets = feedbackTweets.length;
    console.log("data", this.data);
    this.data_avl = true;

    this.total_emergencyTweetsResponded = emergencyTweets.filter(
      (tweet) => tweet.responded === true
    ).length;
    this.total_emergencyTweetsUnResponded = emergencyTweets.filter(
      (tweet) => tweet.responded === false
    ).length;

    this.total_feedbackTweetsResponded = feedbackTweets.filter(
      (tweet) => tweet.responded === true
    ).length;
    this.total_feedbackTweetsUnResponded = feedbackTweets.filter(
      (tweet) => tweet.responded === false
    ).length;

    this.total_postiveFeedback = feedbackTweets.filter(
      (tweet) => tweet.Type === "Positive"
    ).length;

    this.total_negativeFeedback = feedbackTweets.filter(
      (tweet) => tweet.Type === "Negative"
    ).length;

    this.total_medical = emergencyTweets.filter(
      (tweet) => tweet.prediction == "Medical-emergency"
    ).length;

    this.total_legal = emergencyTweets.filter(
      (tweet) => tweet.prediction == "legal-emergency"
    ).length;

    this.total_supply = emergencyTweets.filter(
      (tweet) => tweet.prediction == "supply-emergency"
    ).length;

    this.total_robbery = emergencyTweets.filter(
      (tweet) => tweet.prediction == "robbery"
    ).length;
    

    console.log("check ",this.total_emergencyTweetsUnResponded)
    this.loading=false

    }

  },
  async created() {

    this.loading=true;
    this.showCharts();
    let intervalID = setInterval(this.showCharts, 3000);
   
   

   this.$once("hook:beforeDestroy", () => {
  
     clearInterval(intervalID);
   });
    
   

  },
};
</script>

<style>

.chart-heading
{


  font-weight: bold;
}

#chartsec1,
#chartsec2 {
  display: flex;
  margin-top: 50px;
  justify-content: space-around;
  flex-wrap: wrap;
}

#chartsec1 div {
  /* width: 40%; */
}

.numeric-data {
  font-size: 2.5em;
}
#tab-stats {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
}

#title {
  display: flex;
  justify-content: left;
  margin-bottom: 60px;
}

.tab-heading {
  font-weight: bold;
}
.stats {
  border: 1px solid #edecec;
  border-radius: 5px;
  padding: 5px;
  background-color: #f6f6f0;

  min-width: 200px;
}

#analysis {
  width: 100%;

  /* height: 100vh; */
  padding: 10px;
  margin: 0 80px;
  background-color: #e3e3e336;
}
</style>
