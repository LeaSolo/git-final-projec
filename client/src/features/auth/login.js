import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authToken";
import React from 'react';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'; 
import {Card} from "primereact/card"
import faceBook from "../img/faceBook.png"


const Login = () => {
  const [login, { isError, isSuccess, error, data }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isSuccess) {
      
      dispatch(setToken(data.accessToken));
      navigate("/home");
    }
  }, [isSuccess, data, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
  
    <div className="card" style={{ maxWidth: "400px", margin: "auto", marginTop: "3rem", padding: "2rem" }}>  
    <Card style={{width:"400px"}}>
      <h1 style={{textAlign:"center" ,color:"pink"}}>HI YOU</h1>
      <h2 style={{textAlign:"center" }}>!כיף לראות אותך פה</h2>
      <form onSubmit={handleSubmit}>
    
        <div className="flex flex-wrap align-items-center gap-2 mb-3">
          <label htmlFor="email" className="p-hidden-accessible">אימייל</label>
          <InputText
            id="email"
            name="email"
            placeholder="Email"
            className="p-invalid w-full"
            onChange={handleChange}
            value={formData.email}
          />
          {isError && <Message severity="error" text="אימייל שגוי או חסר" />}
        </div>

      
        <div className="flex flex-wrap align-items-center gap-2 mb-3">
          <label htmlFor="password" className="p-hidden-accessible">סיסמא</label>
          <InputText
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="p-invalid w-full"
            onChange={handleChange}
            value={formData.password}
          />
          {isError && <Message severity="error" text="סיסמא שגויה או חסרה" />}
        </div>

   
        <Button style={{backgroundColor:"black"}}type="submit" label="התחברות"  className="w-full" />
        <img style={{height:"200px",width:"380px"}} src={faceBook}></img>
        
      </form> 
      </Card>
    </div>
   
  );
};

export default Login;
