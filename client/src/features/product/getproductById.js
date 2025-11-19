import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "./productApiSlice";
import { useAddItemToCartMutation } from "../cart/cartApiSlice";

const GetProductsById = () => {
  const { id } = useParams();
  
  const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);//get
  const [addItemToCart] = useAddItemToCartMutation();//post

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>שגיאה: {error?.data?.message || error.toString()}</p>;

 const handleAdd = async () => {
  try {
    console.log('שולח לעגלה:', { productId: product._id, quantity: 1 });
    await addItemToCart({ productId: product._id, quantity: 1 }).unwrap();
    console.log("נוסף לעגלה בהצלחה!");
  } catch (err) {
    console.error("שגיאה בהוספה לעגלה:", err);
  }
};
  return (
    <div className="card">
      <h2>שם: {product.name}</h2>
      <p><strong>תיאור:</strong> {product.description}</p>
      <p><strong>קטגוריה:</strong> {product.category}</p>
      <p><strong>חומר:</strong> {product.material}</p>
      <img src={`/images/${product.imageUrl}`} alt={product.name} width={200} />
      
      <Link to={`/product/updateProducts/${product._id}`}>
        <button>ערוך מוצר</button>
      </Link>

      <button onClick={handleAdd}>הוסף מוצר לסל</button>
    </div>
  );
};

export default GetProductsById;
