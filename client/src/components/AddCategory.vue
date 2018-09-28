<template>
  <form @submit="createCategory">
    <div>
      <label for="title">Title</label>
      <br/>
      <input id="title" type='text' class="textInput" name='title' v-model='title'/>
    </div>

    <div>
      <label for='amount'>Amount</label>
      <br/>
      <input id="amount" type='number' class="textInput" name='amount' v-model='amount'/>
    </div>

    <button type="submit" class='btn'>Add</button>
  </form>
</template>

<script>
  import { ADD_CATEGORY } from "../graphql/addCategory"
  import { ALL_CATEGORY_QUERY } from "../graphql/allCategory"


  export default {
    data() {
      return {
        title: "",
        amount: 0
      }
    },
    apollo: {
      allCategory: {
        query: ALL_CATEGORY_QUERY
      }
    },
    methods: {
      createCategory() {
        const title = this.title;
        const amount = this.amount;

        this.$apollo.mutate({
          mutation: ADD_CATEGORY,
          variables: { title, amount },
          update: (store, { data: { createCategory } }) => {
            const data = store.readQuery({ query: ALL_CATEGORY_QUERY });

            data.allCategory.push(createCategory);
            store.writeQuery({ query: ALL_CATEGORY_QUERY, data })
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

  .textInput {
    width: 400px;
    height: 20px;
  }
</style>
