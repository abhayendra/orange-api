const axios = require("axios");
require("dotenv").config();

// Define a function to get Repo Detail
async function getRepoDetails(repoName) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const { name, size, owner, private: isPrivate } = response.data;
    return {
      name,
      size,
      owner: owner.login,
      isPrivate,
    };
  } catch (error) {
    throw error;
  }
}

// Define a function to fetch the number of files
async function getNumberOfFiles(repoName) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}/git/trees/master?recursive=1`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const numberOfFiles = response.data.tree.length;
    return numberOfFiles;
  } catch (error) {
    throw error;
  }
}

// Define a function to fetch the content of a YAML file
async function getYAMLFileContent(repoName, filePath) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    return content;
  } catch (error) {
    throw error;
  }
}

// Define a function to Get Active Webhooks
async function getActiveWebhooks(repoName) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}/hooks`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const activeWebhooks = response.data.filter(
      (webhook) => webhook.active === true
    );
    return activeWebhooks;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRepoDetails,
  getNumberOfFiles,
  getYAMLFileContent,
  getActiveWebhooks,
};
