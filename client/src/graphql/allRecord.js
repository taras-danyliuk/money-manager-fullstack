import gql from "graphql-tag"


export const ALL_RECORD_QUERY = gql`
  query allRecord{
    allRecord {
        id
        type
        amount
    }
  }
`
