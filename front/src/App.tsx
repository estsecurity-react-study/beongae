import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Layout from '@/components/Layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Join from '@/pages/join';
import NoMatch from '@/pages/NoMatch';

function App({ name }: { name?: string }) {
  const [count, setCount] = useState(0);
  const abc = 1;

  const navigate = useNavigate();
  const location = useLocation();

  const [isInitialize, setIsInitialize] = useState(false);

  useLayoutEffect(() => {
    console.log('App Init =========', name);

    const init = async () => {
      try {
        const me = await axios.get('/auth/profile');

        if (!me.data) {
          return navigate('/login');
        }

        const { pathname } = location;
        if (pathname === '/login' || pathname === '/join') {
          navigate('/');
        }
      } catch (err) {
        navigate('/login');
      } finally {
        setIsInitialize(true);
      }
    };
    init();
  }, []);

  if (!isInitialize) {
    return null;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

export default App;
