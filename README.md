# orange-api

This repository contains the code for an Apollo GraphQL server that supports two main scenarios: showing a list of repositories and showing repository details. To interact with the GitHub API and retrieve the necessary data, you will need to provide a developer token.

## Getting Started

Before you can run this GraphQL server, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

   ```shell
   git clone <repository-url>
   ```

2. **Install Dependencies**: Navigate to the project folder and install the required dependencies.

   ```shell
   cd orange-api
   npm install
   ```

3. **Set up Environment Variables**: Create a `.env` file in the root of the project to store your GitHub developer token.

   ```shell
   touch .env
   ```

   Inside the `.env` file, add your GitHub developer token:

   ```env
   PORT=<port-no>
   GITHUB_TOKEN=<your-github-developer-token>
   REPO_LIST=<owner/reponame1>,<owner/reponame1>,<owner/reponame1> 
   ```

4. **Start the Server**: Run the following command to start the GraphQL server.

   ```shell
   npm start
   ```

## Scenarios

### 1. Show List of Repositories

To retrieve a list of repositories, you can use the following GraphQL query:

```graphql
query {
  repositories {
    name
    size
    owner
  }
}
```

This query will return a list of repositories with their names, sizes, and owners.

### 2. Show Repo Details

To retrieve detailed information about a specific repository, use the following GraphQL query:

```graphql
query {
  repository(name: "repository-name") {
    name
    size
    owner
    isPrivate
    numberOfFiles
    activeWebhooks
  }
}
```

### 3. Show FileContent 

To retrieve detailed information about a specific repository, use the following GraphQL query:

```graphql
query repoFileContent{
  repoFileContent(name: "repository-name", filepath:"file-path") {
    content
  }
}
```

Replace `"repository-name"` with the name of the repository and `"filepath"` with the file path. This query will return  the content of the file.

## Developer Token

To ensure secure and authorized access to the GitHub API, make sure to provide a valid GitHub developer token in the `.env` file as mentioned in the "Getting Started" section.

## Note

This GraphQL server interacts with the GitHub API to fetch repository data. Make sure your GitHub developer token has the necessary permissions to access the required information.
 
