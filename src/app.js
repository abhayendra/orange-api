require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildSchema, print } = require("graphql");
const typeDefs = require("./modules/main.typeDefs.gql");
const resolvers = require("./modules/main.resolver.js");

const app = express();
const port = process.env.PORT;

// Start ApolloServer (2. Create an Apollo GraphQL server )
const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

app.listen({ port }, () => {
  console.log(
    `Server is running on http://localhost:${port}${server.graphqlPath}`
  );
});
startServer();
