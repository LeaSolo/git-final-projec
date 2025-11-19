import { useRegisterMutation } from "./authApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card"
import faceBook from "../img/faceBook.png"
import { setToken } from "./authToken";
import { useDispatch } from "react-redux";

const Register = () => {
  const [register, { isError, isSuccess, isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''


  });


  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData).unwrap();
      dispatch(setToken({ token: result.accessToken }));
    } catch (err) {
      alert(err?.data?.message || "שגיאה לא ידועה ברישום");
    }
  };


  return (
    <div className="card" style={{ maxWidth: "400px", margin: "auto", marginTop: "3rem", padding: "2rem" }}>
      <Card style={{ width: "400px" }}>
        <h1 style={{ textAlign: "center", color: "pink" }}>HI YOU</h1>
        <h2 style={{ textAlign: "center" }}>!כיף לראות אותך פה</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap align-items-center gap-2 mb-3">
            <label htmlFor="email" className="p-hidden-accessible">:שם</label>
            <InputText
              id="email"
              name="name"
              placeholder="שם"
              className="p-invalid w-full"
              onChange={handleChange}
              value={formData.name}
            />
            {isError && <Message severity="error" text="שם שגוי או חסר" />}
          </div>
          <div className="flex flex-wrap align-items-center gap-2 mb-3">
            <label htmlFor="email" className="p-hidden-accessible">:טלפון</label>
            <InputText
              id="email"
              name="phone"
              placeholder="טלפון"
              className="p-invalid w-full"
              onChange={handleChange}
              value={formData.phone}
            />
            {isError && <Message severity="error" text="טלפון שגוי או חסר" />}
          </div>

          <div className="flex flex-wrap align-items-center gap-2 mb-3">
            <label htmlFor="email" className="p-hidden-accessible">אימייל</label>
            <InputText
              id="email"
              name="email"
              placeholder="אימייל"
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
          <Button style={{ backgroundColor: "black" }} type="submit" label="התחברות" className="w-full" />
          <br></br><br></br><br></br>
          <Button style={{ backgroundColor: "black" }} onClick={() => navigate("/login")} label=" ?משתמש קים" className="w-full" />
          <img style={{ height: "200px", width: "380px" }} src={faceBook}></img>

        </form>
      </Card>
    </div>
  );
};

export default Register;
