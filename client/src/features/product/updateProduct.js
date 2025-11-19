import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "./productApiSlice";
import { useUpdateProductMutation } from "./productApiSlice";

const UpdatedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isSuccess, isError: isUpdateError }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    countInStock: "",
    imageUrl: "",
  });


  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        countInStock: product.countInStock || "",
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);


  useEffect(() => {
    if (isSuccess) {
      navigate("/getproduct");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ id, ...formData }); 
  };

  if (isLoading) return <p>טוען...</p>;
  if (isError) return <p>שגיאה: {error?.data?.message || error.toString()}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>עריכת מוצר</h2>

      <input name="name" placeholder="שם" value={formData.name} onChange={handleChange} /><br />
      <textarea name="description" placeholder="תיאור" value={formData.description} onChange={handleChange} /><br />
      <input name="category" placeholder="קטגוריה" value={formData.category} onChange={handleChange} /><br />
      <input name="price" placeholder="מחיר" value={formData.price} onChange={handleChange} /><br />
     
      <input name="material" placeholder="חומר" value={formData.material} onChange={handleChange} /><br />
<input name="imageUrl" placeholder="תמונה" value={formData.imageUrl} onChange={handleChange} /><br />
      <button type="submit">עדכן</button>
      {isUpdateError && <p style={{ color: 'red' }}>שגיאה בעדכון</p>}
    </form>
  );
};

export default UpdatedProduct;