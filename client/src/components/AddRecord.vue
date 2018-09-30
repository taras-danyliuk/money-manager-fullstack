<template>
  <form class="add-form" @submit.prevent="createRecord">
    <div class="form-row">
      <label for='amount'>Amount</label>
      <input id="amount" type='number' class="textInput" name='amount' v-model='amount'/>
    </div>

    <div class="form-row">
      <label for="category">Category</label>
      <select class="select" id="category" @change="changeCategory">
        <option v-for="category in allCategory" :key="category.id">{{category.title}}</option>
      </select>
    </div>

    <div class="form-row">
      <label for="date">Date</label>
      <input id="date" type='date' class="textInput" name='date' v-model='date'/>
    </div>

    <button type="submit" class='btn'>Add</button>
  </form>
</template>

<script>
  import { ADD_RECORD } from "../graphql/addRecord"
  import { ALL_RECORD_QUERY } from "../graphql/allRecord"
  import { ALL_CATEGORY_QUERY } from "../graphql/allCategory"


  export default {
    props: ["type"],
    data() {
      return {
        amount: "",
        category: "",
        date: ""
      }
    },
    apollo: {
      allRecord: {
        query: ALL_RECORD_QUERY
      },
      allCategory: {
        query: ALL_CATEGORY_QUERY
      }
    },
    methods: {
      changeCategory(event) {
        this.category = event.target.value;
      },
      createRecord() {
        const date = this.date ? new Date(this.date) : new Date();
        let category = this.category;
        if (!category && this.allCategory.length > 0) category = this.allCategory[0].title;

        this.$apollo.mutate({
          mutation: ADD_RECORD,
          variables: {
            type: this.type,
            amount: this.amount,
            category,
            date: date.toISOString()
          },
          update: (store, { data: { createRecord } }) => {
            const data = store.readQuery({ query: ALL_RECORD_QUERY });

            data.allRecord.push(createRecord);
            store.writeQuery({ query: ALL_RECORD_QUERY, data })
          }
        }).then((data) => {
          console.log("am in promise")
        }).catch((error) => {
          console.error(error)
        });

        this.$router.push({ path: "/" })
      }
    }
  }
</script>

<style>
  .add-form {
    max-width: 500px;
    margin: 15% auto 0;
    text-align: center;
    color: #fff;
  }
  .form-row {
    margin-bottom: 20px
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 20px;
    height: 30px;
    width: 150px;
    color: #000;
    background-color: rgba(255,255,255,1);
    border: none;
    font-weight: bold;
    border-radius: 4px;
  }

  .textInput, .select {
    width: 100%;
    border: 1px solid rgba(255,255,255,.2);
    background-color: transparent;
    height: 30px;
    color: #fff;
    border-radius: 4px;
    padding: 0 10px;
    box-sizing: border-box;
  }
</style>
