import gql from "graphql-tag"

// creating a mutation to add new post
export const ADD_CATEGORY = gql`
 mutation addCategory($title: String!, $amount: Float!){
   createCategory(title: $title, amount: $amount){
     id
     title
     amount
   }
 } 
`;
