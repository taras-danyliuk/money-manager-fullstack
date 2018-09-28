import gql from "graphql-tag"

// creating a mutation to add new post
export const ADD_RECORD = gql`
 mutation addRecord($type: String!, $amount: Float!, $date: String!){
   createRecord(type: $type, amount: $amount, date: $date){
     id
     type
     amount,
     date
   }
 } 
`;
