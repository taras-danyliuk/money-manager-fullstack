module.exports = `
  type Category {
    id: ID!
    title: String!
    amount: Float!
    createdAt: String!
  }
  type Record {
    id: ID!
    type: String!
    amount: Float!
    category: String!
    date: String!
    createdAt: String!
  }
  type Query {
    allCategory: [Category]!
    allRecord: [Record]!
  }
  type Mutation {
    createCategory(title: String!, amount: Float!): Category
    createRecord(type: String!, amount: Float!, category: String! date: String!): Record
  }
`;
