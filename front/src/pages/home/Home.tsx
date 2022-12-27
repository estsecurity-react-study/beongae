import React, { useCallback } from 'react';
import axios from 'axios';

const Home = () => {
  const getProfile = useCallback(async () => {
    const me = await axios.get('/auth/profile');
    console.log('Home getProfile', me);
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <button onClick={getProfile}>프로필</button>
    </div>
  );
};

export default Home;
