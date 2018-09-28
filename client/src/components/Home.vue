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


    <div class="history">

      <p
        class="history-row"
        v-bind:class="{ income: record.type === 'income', expense: record.type === 'expense'}"
        v-for="record in allRecord"
        :key="record.id"
      >
        {{record.amount}}
      </p>
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

  import { ALL_CATEGORY_QUERY } from "../graphql/allCategory"
  import { ALL_RECORD_QUERY } from "../graphql/allRecord"


  export default {
    name: "home",
    data() {
      return {
        loading: 0,
        allPost: [],
        allCategory: [],
        allRecord: []
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
    margin: 5px 0;
  }
  .income {
    color: greenyellow;
  }
  .expense {
    color: darkred;
  }
</style>
