import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Search() {
  const [querysave, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('displayName', '==', querysave));
      const querySnapshot = await getDocs(q);
      const foundUsers = querySnapshot.docs.map((doc) => doc.data());
      setResults(foundUsers);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users"
        value={querysave}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results:</h2>
        <ul>
          {results.map((user) => (
            <li key={user.id}>{user.displayName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
