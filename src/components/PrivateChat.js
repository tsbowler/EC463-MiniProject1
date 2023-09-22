import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot, addDoc, serverTimestamp, query as firestoreQuery, where, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleSignoutButton from './GoogleSignoutButton';

async function createChatRoomIfNotExists(chatRoomId, user) {
  // Create a reference to the chat room document
  const chatRoomRef = doc(db, 'chatRooms', chatRoomId);

  // Check if the chat room document exists
  const chatRoomDoc = await getDoc(chatRoomRef);

  if (!chatRoomDoc.exists()) {
    // Extract the user IDs from the chatRoomId
    const userIds = chatRoomId.split('-');

    // If the chat room document doesn't exist, create it
    await setDoc(chatRoomRef, {
      chatRoomId: chatRoomId,
      user1: userIds[0],
      user2: userIds[1], // Set the user2 ID based on the chatRoomId
    });
  }
}

function PrivateChat() {
  const { chatRoomId } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Create the chat room if it doesn't exist
    createChatRoomIfNotExists(chatRoomId, user);
  
    // Create a reference to the messages collection within the chat room document
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    const messagesRef = collection(chatRoomRef, 'messages');
    const q = firestoreQuery(messagesRef, where('chatRoomId', '==', chatRoomId));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messageList = [];
      querySnapshot.forEach((doc) => {
        messageList.push(doc.data());
      });
      setMessages(messageList);
    });
  
    return () => {
      unsubscribe();
    };
  }, [chatRoomId, user]);
  

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
      const messagesRef = collection(chatRoomRef, 'messages');

      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: user.displayName || 'Guest',
        chatRoomId: chatRoomId,
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);

  const handleReturnHome = () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <GoogleSignoutButton/>
      <button onClick={handleReturnHome}>Return to Home</button>
      {true ? (
        <div>
          <h2>Private Chat Room</h2>
          <div className="chat-messages">
            {sortedMessages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <p>Chat room not found...</p>
      )}
    </div>
  );
}

export default PrivateChat;