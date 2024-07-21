import { databases, databaseId, tokensCollectionId } from './appwriteConfig';

export const addToken = async (userId, points) => {
  try {
    await databases.createDocument(databaseId, tokensCollectionId, 'unique()', {
      userId,
      points,
    });
    alert('Token added');
  } catch (error) {
    alert(error.message);
  }
};

export const updateToken = async (documentId, points) => {
  try {
    await databases.updateDocument(databaseId, tokensCollectionId, documentId, {
      points,
    });
    alert('Token updated');
  } catch (error) {
    alert(error.message);
  }
};
