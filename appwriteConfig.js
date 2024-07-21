import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const usersCollectionId = process.env.REACT_APP_USERS_COLLECTION_ID;
const tokensCollectionId = process.env.REACT_APP_TOKENS_COLLECTION_ID;

export { client, account, databases, databaseId, usersCollectionId, tokensCollectionId };
