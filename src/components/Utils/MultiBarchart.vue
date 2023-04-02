<template>
    <div>
      <div id="chart"></div>
    </div>
  </template>
  
  <script>
  import ApexCharts from "apexcharts";
  
  export default {
    name: "MultiBarChart",
    props: {
      data: {
        type: Array,
        required: true,
      },
      labels: {
        type: Array,
        required: true,
      },
    },
    mounted() {
    console.log("Props barchart",this.data,this.labels)
      this.renderChart();
    },
    computed:
    {
      getData()
      {
        return this.data
      }

    },
    created()
    {
      console.log("inside mbc")

    },
    methods: {
      renderChart() {
        const options = {
          chart: {
            type: "bar",
            stacked: true,
            height:300,
            // width:300
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "70%",
            },
          },
          series: this.getData,
          xaxis: {
            categories: this.labels,
          },
          legend: {
            position: "bottom",
          },
          fill: {
            opacity: 1,
          },
        };
  
        const chart = new ApexCharts(
          document.querySelector("#chart"),
          options
        );
        chart.render();
      },
    },
  };
  </script>
  