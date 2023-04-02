<template>
    <canvas ref="canvas" height="300" width="300"></canvas>
  </template>
  
  <script>
  import Chart from "chart.js";
  
  export default {
    name: "BarChart",
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
    
      this.renderChart();
    },
    methods: {
      renderChart() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "Data One",
                backgroundColor: ["#66e307","#f87979","#ceed91","#7eede2"],
                data: this.data,
              },
            ],
          },
          options: {
            responsive: false,
            maintainAspectRatio: true,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    width: 300px;
    height:300px;
  }
  </style>
  