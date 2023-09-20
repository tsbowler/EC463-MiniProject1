import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, onSnapshot, addDoc, serverTimestamp, query as firestoreQuery, where } from 'firebase/firestore'; // Import query as firestoreQuery
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function PrivateChat() {
  const { chatRoomId } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    const messagesRef = collection(chatRoomRef, 'messages');
    const q = firestoreQuery(messagesRef, where('chatRoomId', '==', chatRoomId)); // Add this line to create the Firestore query

    const unsubscribe = onSnapshot(q, (querySnapshot) => { // Use the 'q' query
      const messageList = [];
      querySnapshot.forEach((doc) => {
        messageList.push(doc.data());
      });
      setMessages(messageList);
    });

    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
      const messagesRef = collection(chatRoomRef, 'messages');

      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: user.displayName || 'Guest',
        chatRoomId: chatRoomId, // Add chatRoomId to associate messages with the correct room
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      {chatRoom ? (
        <div>
          <h2>Private Chat Room</h2>
          <div className="chat-messages">
            {messages.map((msg, index) => (
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