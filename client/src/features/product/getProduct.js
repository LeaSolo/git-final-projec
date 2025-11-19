import { useDeleteProductMutation, useGetProductsQuery } from "./productApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const GetProducts = () => {
  const { data: products, isError, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deleteProduct(id).then(() => refetch());
  };

  if (isLoading) return <p>טוען מוצרים...</p>;
  if (isError) return <p>שגיאה בטעינה: {JSON.stringify(error)}</p>;

  return (
    <div>
      <span>this is the change number 2 in the visual</span>
      <h2>רשימת מוצרים</h2>
      {products?.map((p) => (
        <div key={p._id}>
          <Link to={`/product/${p._id}`}> <label>שם: {p.name}</label><br />
            <label>תיאור: {p.description}</label><br />
            <label>קטגוריה: {p.category}</label><br />
            <label>חומר: {p.material}</label><br />
            <label>מחיר: {p.price}</label><br />
            <img
              src={`/images/${p.imageUrl}`}
              style={{ width: '250px', height: '150px', objectFit: 'cover' }}
            />
            <br />
          </Link>
          <br />
          
          <button onClick={() => handleDelete(p._id)}>מחיקה</button>
        </div>
      ))}
    </div>
  );
};

export default GetProducts;
