import gql from "graphql-tag"


export const ALL_CATEGORY_QUERY = gql`
  query allCategory{
    allCategory {
        id
        title
        amount
    }
  }
`;
