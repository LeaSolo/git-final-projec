
//import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/login";
import Register from "./features/auth/register";
import GetProductsById from "./features/product/getproductById";
import CreateProduct from "./features/product/createProduct";
import GetProducts from "./features/product/getProduct";
import UpdatedProduct from "./features/product/updateProduct";
import Home from "./features/home";
import AddItemToCart from "./features/cart/addToCart";
import GetCart from "./features/cart/getcart";
console.log("App loaded");

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/getProduct" element={<GetProducts />}/>
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<GetProductsById />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/AddItemToCart" element={<AddItemToCart />} />
          <Route path="product/updateproducts/:id" element={<UpdatedProduct />} />
         <Route path="/cart" element={<GetCart />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
