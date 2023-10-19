import { useState, useEffect } from 'react';
import { auth } from '../firebase';
// import { httpsCallable } from 'firebase/functions';

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      currentUser.getIdTokenResult().then(idTokenResult => {
        setIsAdmin(idTokenResult.claims.admin);
      });
    }
  }, []);

  const handleSearch = () => {
    let functionUrl;

    if (searchTerm.includes('@')) {
      functionUrl = 'https://europe-west1-kofte-nettside-88641.cloudfunctions.net/getUserByEmail';
    } else if (searchTerm.length === 28) {
      functionUrl = 'https://europe-west1-kofte-nettside-88641.cloudfunctions.net/getUserByUid';
    } else if (/^\d+$/.test(searchTerm)) {
      functionUrl = 'https://europe-west1-kofte-nettside-88641.cloudfunctions.net/getUserByBrukerId';
    } else {
      functionUrl = 'https://sayhello-chchyr4l3a-uc.a.run.app';
    }

    fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
      body: JSON.stringify({ term: searchTerm }),
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([data]);
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      {isAdmin && <p>You are logged in as an admin.</p>}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email, UID, or brukerId"
      />
      <button onClick={handleSearch}>Search</button>

      {users.map((user) => (
        <div key={user.uid}>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          <p>Address: {user.address}</p>
          <p>Bruker ID: {user.brukerId}</p>
          <p>City: {user.city}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
