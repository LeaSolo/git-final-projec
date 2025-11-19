import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';
console.log("Layout loaded")
const Layout = () => {
  return (
    <>
      <Navbar />
      
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
