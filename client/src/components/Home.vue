<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>

    <!--<h1 class="title">MoneySaver</h1>-->

    <div class="navigation">
      <router-link to="/plus">
        <h3>Income</h3>
      </router-link>

      <router-link to="/minus">
        <h3>Expense</h3>
      </router-link>
    </div>


    <!--<div class="balance">-->
      <!--<p>10000</p>-->
    <!--</div>-->

    <donut-chart
      :data="chartData"
      :options="chartOptions"
      :width="300"
      :height="300"
    />

    <div>
      <span>{{totalIncome}}</span>
      <span>{{totalExpense}}</span>

      <p>{{JSON.stringify(totalExpenseByCategories)}}</p>
    </div>


    <div class="history">
      <div class="history-row"  v-for="record in allRecordOrdered" :key="record.id">
        <span>{{record.category}}</span>

        <span v-bind:class="{ income: record.type === 'income', expense: record.type === 'expense'}">{{record.amount}}</span>
      </div>

    </div>

    <!--<div v-for='post in allPost' :key='post.id'>-->
      <!--<router-link :to="post.id" exact>-->
        <!--<h3>{{post.title}}</h3>-->
      <!--</router-link>-->
      <!--<p>{{post.content}}</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import DonutChart from "./DonutChart"

  import { ALL_CATEGORY_QUERY } from "../graphql/allCategory"
  import { ALL_RECORD_QUERY } from "../graphql/allRecord"


  export default {
    name: "home",
    components: {
      DonutChart
    },
    data() {
      return {
        loading: 0,
        allPost: [],
        allCategory: [],
        allRecord: [],
        chartData: {
          labels: ["January", "February"],
          datasets: [
            {
              label: "GitHub Commits",
              backgroundColor: "#f87979",
              data: [40, 20]
            }
          ]
        },
        chartOptions: { responsive: false, maintainAspectRatio: false }
      }
    },
    computed: {
      allRecordOrdered: function () {
        const copy = this.allRecord.slice();

        return copy.sort(function (a, b) {
          return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
        });
      },
      totalIncome: function () {
        let total = 0;
        const allIncome = this.allRecord.filter(record => record.type === "income");
        allIncome.forEach(record => { total += +record.amount });

        return total;
      },
      totalExpense: function () {
        let total = 0;
        const allExpense = this.allRecord.filter(record => record.type === "expense");
        allExpense.forEach(record => { total += +record.amount });

        return total;
      },
      totalExpenseByCategories: function () {
        const totals = {};

        const allExpense = this.allRecord.filter(record => record.type === "expense");
        allExpense.forEach(record => {
          const currentCategory = record.category;

          if (currentCategory in totals) totals[currentCategory] += +record.amount;
          else totals[currentCategory] = +record.amount;
        });

        return totals;
      }
    },
    apollo: {
      allCategory: {
        query: ALL_CATEGORY_QUERY
      },
      allRecord: {
        query: ALL_RECORD_QUERY
      }
    },
    updated() {
      console.log(this.allCategory, "category");
      console.log(this.allRecord, "record");
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    text-align: center;
    color: #333
  }
  .navigation {
    display: flex;
    justify-content: space-around;
  }

  .history {
    max-width: 500px;
    margin: 0 auto;
    background: #bebebe;
    padding: 15px 20px
  }
  .history-row {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }
  .history-row-value {
    margin: 0;
  }
  .income {
    color: greenyellow;
  }
  .expense {
    color: darkred;
  }
</style>
