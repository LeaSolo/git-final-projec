import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../features/auth/authToken';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import logo from "../features/img/1.png";
import home from "../features/home"
import end from "../features/img/the-end-paper.png"
import { Button } from 'primereact/button';
import useAuth from '../features/auth/authUse';


const Navbar = () => {
  const isUserLoggedIn = useSelector((state) => state.auth?.isUserLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, role } = useAuth();

  const items = [
    { label: 'Home', command: () => navigate("/home") },
    { label: 'הרשמה', icon: 'pi pi-user', command: () => navigate('/register'), },
    { label: 'כניסה', icon: 'pi pi-user', command: () => navigate('/login'), },
    isUserLoggedIn && { label: 'צארמס', command: () => navigate('/getProduct') },
    isUserLoggedIn && { label: 'עגילים', command: () => navigate('/getProduct') },
    isUserLoggedIn && { label: 'טבעות', command: () => navigate('/getProduct') },
    isUserLoggedIn && { label: 'שרשראות', command: () => navigate('/getProduct') },
    isUserLoggedIn && { label: 'צמידים', command: () => navigate('/getProduct') },
    isUserLoggedIn && { label: 'addProduct', command: () => navigate('/createproduct') },
    isUserLoggedIn && { label: 'סל קניות', icon: 'pi pi-shopping-cart', command: () => navigate('/cart'), },
    <p>{name}</p>



  ]

  const start = (
    <img
      alt="logo"
      src={logo}
      height="40"
      className="mr-2"
    />
  );

  const end = (
    <div className="flex align-items-center gap-2">
       <p>{name}</p>
      {isUserLoggedIn && <Button onClick={() => handleLogout()}
        icon="pi pi-user" rounded outlined aria-label="Filter">    LogOut </Button>}
      <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
     
      <Avatar image="./1.png" shape="circle" />
      
    </div>

  );
  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };
  return (
    <>
<div style={{backgroundColor:"pink",height:"30px",width:"100vw"}}></div>
      <div className="card" >
        <div className="lea">
          < Menubar model={items} start={start} end={end} />
        </div>
      </div>


      {/* <img src={end}></img> */}

      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isUserLoggedIn && <li><Link to="/login">Login</Link></li>}
          {!isUserLoggedIn && <li><Link to="/register">Register</Link></li>}
          {isUserLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
        </ul>
      </nav> */}
    </>
  );
};

export default Navbar;
