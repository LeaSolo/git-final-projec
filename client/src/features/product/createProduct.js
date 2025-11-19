import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../features/product/productApiSlice";

const CreateProduct = () => {
  const [createProduct, { isError, isSuccess }] = useCreateProductMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    material: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    console.log("נכנס ליוזאפקט");
    if (isSuccess) {
      navigate("/getproduct");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    console.log("נכנס להנדל ציינג");
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    console.log("נכנס להנדלסבמיט");
    e.preventDefault();
    console.log(" 2נכנס להנדלסבמיט");
    console.log(formData);
   
    createProduct(formData);
  };

  return (
   
    <form onSubmit={handleSubmit}>
       <h1>This is a change</h1>
      <input
        type="text"
        name="name"
        placeholder="שם מוצר"
        value={formData.name}
        onChange={handleChange}
      /><br />

      <textarea
        name="description"
        placeholder="תיאור"
        value={formData.description}
        onChange={handleChange}
      /><br />

      <input
        type="text"
        name="category"
        placeholder="קטגוריה"
        value={formData.category}
        onChange={handleChange}
      /><br />

      <input
        type="text"
        name="price"
        placeholder="מחיר"
        value={formData.price}
        onChange={handleChange}
      /><br />

      <input
        type="text"
        name="material"
        placeholder="חומר"
        value={formData.material}
        onChange={handleChange}
      /><br />
      <input
        type="img"
        name="image"
        placeholder="תמונה"
        value={formData.image}
        onChange={handleChange}
      /><br />
      <button type="submit">הוסף מוצר</button>

      {isError && <p >שגיאה בהוספת מוצר</p>}
    </form>
  );
};

export default CreateProduct;
