<template>

  <canvas  ref="canvas" height="300" width="300" ></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "PieChart",
  data()
  {
    return{

      isMounted: false,
    }
  },
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
  beforeDestroy() {
    this.isMounted = false;
  },
  mounted() {
    this.isMounted=true;
    // this.renderChart();
    this.$nextTick(() => {
      this.renderChart();
    });
  
  },
  methods: {
    renderChart() {

      
  const canvas = this.$refs.canvas;
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
  type: "pie",
  data: {
    labels: this.labels,

    datasets: [
      {
        data: this.data,
        backgroundColor: [
                   "#FF6384",
        "#36A2EB",
 
      
        ],
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontSize: 16
      }
    }
  }
});

}

  },
};
</script>

<style scoped>
canvas {
  width: 300px;
  height: 300px;
}
</style>
