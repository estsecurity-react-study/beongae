import React, { useCallback } from 'react';
import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      const result = await axios.post('/auth/logout');
      console.log('result', result);
      if (result.data) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error: /auth/logout');
    }
  }, []);

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
          <li>
            <button onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default Layout;
