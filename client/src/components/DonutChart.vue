<script>
  import { Doughnut, mixins } from "vue-chartjs"
  const { reactiveProp } = mixins;

  export default {
    name: "donutChart",
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ["chartData"],
    mounted() {
      const options = { responsive: false, maintainAspectRatio: false };

      this.renderChart(this.chartData, options)
    }
  }
</script>
