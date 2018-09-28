import gql from "graphql-tag"

// creating a mutation to add new post
export const ADD_RECORD = gql`
 mutation addRecord($type: String!, $amount: Float!, $category: String! $date: String!){
   createRecord(type: $type, amount: $amount, category: $category, date: $date){
     id
     type
     amount
     category
     date
   }
 } 
`;
