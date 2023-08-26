const { mergeResolvers } = require("@graphql-tools/merge");
const githubResolvers = require("./github/github.resolver.js");

const resolvers = [githubResolvers];

module.exports = mergeResolvers(resolvers);
