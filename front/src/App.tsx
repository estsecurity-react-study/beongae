import { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Join from '@/pages/join';
import NoMatch from '@/pages/NoMatch';

function App({ name }: { name?: string }) {
  const [count, setCount] = useState(0);
  const abc = 1;

  useEffect(() => {
    console.log(name);
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
