import { createBatchingNetworkInterface, ApolloClient } from "apollo-client"

// making apollo client connect with our backend

export const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: "http://localhost:3033/graphql"
  }),
  connectToDevTools: true
})

