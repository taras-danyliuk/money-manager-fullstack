<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>

    <!--<h1 class="title">MoneySaver</h1>-->

    <div class="navigation">
      <router-link to="/plus">
        <h3 class="income">Income</h3>
      </router-link>

      <router-link to="/minus">
        <h3 class="expense">Expense</h3>
      </router-link>
    </div>

    <div class="charts-holder">
      <div class="donut-holder">
        <donut-chart
          class="donut-block"
          :chartData="totalIncomeByCategories"
          :width="300"
          :height="300"
        />

        <span class="donut-total income">{{totalIncome}}</span>
      </div>

      <div class="donut-holder">
        <donut-chart
          class="donut-block"
          :chartData="totalExpenseByCategories"
          :width="300"
          :height="300"
        />

        <span class="donut-total expense">{{totalExpense}}</span>
      </div>
    </div>

    <div class="history">
      <div
        class="history-row"
        v-for="record in allRecordOrdered"
        :key="record.id"
        v-bind:class="{ income: record.type === 'income', expense: record.type === 'expense'}"
      >
        <span>{{record.category}}</span>

        <div class="history-row-additional">
          <span>{{record.amount}}</span>
          <span>{{new Date(record.date).toDateString()}}</span>
        </div>
      </div>

    </div>
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
        allRecord: []
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

        return {
          labels: Object.keys(totals),
          datasets: [{
            backgroundColor: ["#4645f8", "#3c24f8", "#2e86f8"],
            borderWidth: 0,
            data: Object.values(totals)
          }]
        }
      },
      totalIncomeByCategories: function () {
        const totals = {};

        const allIncome = this.allRecord.filter(record => record.type === "income");
        allIncome.forEach(record => {
          const currentCategory = record.category;

          if (currentCategory in totals) totals[currentCategory] += +record.amount;
          else totals[currentCategory] = +record.amount;
        });

        return {
          labels: Object.keys(totals),
          datasets: [{
            backgroundColor: ["#ff51a7", "#ff74bb", "#ff8fd9"],
            borderWidth: 0,
            data: Object.values(totals)
          }]
        }
      }
    },
    apollo: {
      allCategory: {
        query: ALL_CATEGORY_QUERY
      },
      allRecord: {
        query: ALL_RECORD_QUERY
      }
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
    margin: 30px auto 0;
    /*background: rgba(255,255,255,.1);*/
    padding: 15px 20px;
  }
  .history-row {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 18px;
  }
  .history-row-value {
    margin: 0;
  }
  .history-row-additional {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
  .income {
    color: #ff51a7;
    text-decoration: none;
  }
  .expense {
    color: #2e86f8;
    text-decoration: none;
  }

  .charts-holder {
    display: flex;
    justify-content: space-around;
  }
  .donut-holder {
    position: relative;
  }
  .donut-total {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
</style>
