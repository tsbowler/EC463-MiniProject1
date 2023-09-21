import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firestore instance from your Firebase config file

export async function addUserToFirestore(user) {
    try {
        const usersRef = collection(db, 'users');
        
        // Check if the user already exists in the collection
        const userDoc = doc(usersRef, user.uid); // Assuming user.uid uniquely identifies users
        
        const docSnapshot = await getDoc(userDoc);
    
        if (!docSnapshot.exists()) {
          // User does not exist in the collection, so add them
          await setDoc(userDoc, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            // Add other user properties as needed
          });
        }
      } catch (error) {
        console.error('Error adding user to collection:', error);
      }
    }

    function generateChatRoomId(userId1, userId2) {
      const sortedUserIds = [userId1, userId2].sort();
      const chatRoomId = sortedUserIds.join('-');
      return chatRoomId;
    }
        

export { generateChatRoomId };