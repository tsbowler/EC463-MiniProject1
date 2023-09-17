import React from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ db }) {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'desc'));
  const [messages] = useCollectionData(q, { idField: 'id' });

  return (
    <div>
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))
      ) : (
        <h1>Chat Room Placeholder</h1>
      )}
    </div>
  );
}

export default ChatRoom;

