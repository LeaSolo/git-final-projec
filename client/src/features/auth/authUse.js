import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    try {
      const userinfo = jwtDecode(token);
      const { password, name, email, phone, role } = userinfo;
      return { password, name, email, phone, role, isUserLoggedIn: true };
    } catch (error) {
      console.error("שגיאה בפענוח הטוקן:", error);
      return { password: "", name: "", email: "", phone: "", role: "", isUserLoggedIn: false };
    }
  }

  return { password: "", name: "", email: "", phone: "", role: "", isUserLoggedIn: false };
};

export default useAuth;
