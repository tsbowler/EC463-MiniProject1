import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ user, db }) {
  const [message, setMessage] = useState('');
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  const [messages] = useCollectionData(q, { idField: 'id' });

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        user: user.displayName, // Use the user's display name or ID
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages &&
          messages.map((msg) => (
            <div key={msg.id}>
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
  );
}

export default ChatRoom;

