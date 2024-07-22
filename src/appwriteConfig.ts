import { Client, Account } from 'appwrite';

const endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT || 'undefined';
const projectId = process.env.REACT_APP_APPWRITE_PROJECT_ID || 'undefined';

if (endpoint === 'undefined' || projectId === 'undefined') {
  console.error('Environment variables are not correctly set');
}

console.log('Endpoint:', endpoint);
console.log('Project ID:', projectId);

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

const account = new Account(client);

export { client, account };
