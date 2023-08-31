require("dotenv").config();
const {
  getRepoDetails,
  getNumberOfFiles,
  getYAMLFileContent,
  getActiveWebhooks,
} = require("../../utils/github.js");

const githubResolvers = {
  Query: {
    // 3.1 Show List of Repositories
    listRepositories: async () => {
      const repoList = process.env.REPO_LIST
        ? process.env.REPO_LIST.split(",")
        : [];
      const repoNames = repoList;
      // scanning all 3 repo's at the same time limit your code to scan up to maximum 2 repo's in parallel
      const maxConcurrentRequests = 2;
      const chunks = [];
      for (let i = 0; i < repoNames.length; i += maxConcurrentRequests) {
        chunks.push(repoNames.slice(i, i + maxConcurrentRequests));
      }
      const repoDetails = [];
      for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map(getRepoDetails));
        repoDetails.push(...chunkResults);
      }

      return repoDetails.map((repo) => ({
        name: repo.name,
        size: repo.size,
        owner: repo.owner,
      }));
    },

    // 3.2 Show Repo details
    repoDetails: async (_, { name }) => {
      const repoData = await getRepoDetails(name);
      const numberOfFiles = await getNumberOfFiles(name);
      const activeWebhooks = await getActiveWebhooks(name);
      const repoDetails = {
        name: repoData.name,
        size: repoData.size,
        owner: repoData.owner,
        isPrivate: repoData.isPrivate,
        numberOfFiles: numberOfFiles,
        activeWebhooks: activeWebhooks,
      };
      return repoDetails;
    },

    //Content of 1 yml file (anyone that appear in the repo) -> use can get anyfile data
    repoFileContent: async (_, { name, filepath }) => {
      const yamlContent = await getYAMLFileContent(name, filepath);
      const fileContent = {
        content: yamlContent,
      };
      return fileContent;
    },
  },
};

module.exports = githubResolvers;
