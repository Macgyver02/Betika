// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);
  const [selectedBets, setSelectedBets] = useState([]);
  const [stake, setStake] = useState(0);

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    const response = await axios.get('/bets');
    setBets(response.data);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      setUser(username);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handlePlaceBet = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/place-bet', 
        { bet_ids: selectedBets.map(bet => bet.id), stake },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Bet placed successfully!');
      setSelectedBets([]);
      setStake(0);
    } catch (error) {
      console.error('Failed to place bet', error);
    }
  };

  // Render login form, betting slip, etc.
  // ...

  return (
    <div>
      {/* Render your components here */}
    </div>
  );
}

export default App;