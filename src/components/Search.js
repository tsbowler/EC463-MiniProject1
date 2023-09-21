import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { generateChatRoomId } from '../firebaseUtils';

function Search({ authenticatedUserId }) { 
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, 'users');
      const queryByEmail = query(usersRef, where('email', '==', queryText));
      const queryByName = query(usersRef, where('displayName', '==', queryText));
      const querySnapshotEmail = await getDocs(queryByEmail);
      const querySnapshotName = await getDocs(queryByName);

      const foundUsersEmail = querySnapshotEmail.docs.map((doc) => doc.data());
      const foundUsersName = querySnapshotName.docs.map((doc) => doc.data());

      setResults([...foundUsersEmail, ...foundUsersName]);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users by email or display name"
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results:</h2>
        <ul>
          {results.map((user) => (
            <li key={user.uid}>
              <Link to={`/privateChat/${generateChatRoomId(authenticatedUserId, user.uid)}`}>
                {user.displayName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;