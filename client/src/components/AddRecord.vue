<template>
  <form @submit.prevent="createRecord">
    <div>
      <label for='amount'>Amount</label>
      <br/>
      <input id="amount" type='number' class="textInput" name='amount' v-model='amount'/>
    </div>

    <div>
      <label for="category">Category</label>
      <select id="category" @change="changeCategory">
        <option v-for="category in allCategory" :key="category.id">{{category.title}}</option>
      </select>
    </div>

    <div>
      <label for="date">Date</label>
      <br/>
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
  .btn {
    margin-top: 20px;
    height: 30px;
    width: 100px;
    color: white;
    background-color: lightgreen;
  }

  .textarea {
    width: 400px;
    height: 70px;
  }

  .textInput {
    width: 400px;
    height: 20px;
  }
</style>
