import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Join from '@/pages/join';
import NoMatch from '@/pages/NoMatch';

function App({ name }: { name?: string }) {
  const [count, setCount] = useState(0);
  const abc = 1;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
    const init = () => {
      // const user = await getUser();
      const user = false;
      if (!user) {
        console.log('init /login');
        return navigate('/login');
      }
    };
    // init();
  }, []);

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
