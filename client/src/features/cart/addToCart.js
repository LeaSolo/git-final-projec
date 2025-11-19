import { useAddItemToCartMutation } from "./cartApiSlice";

const AddItemToCart = ({ product }) => {
  const [addItemToCart] = useAddItemToCartMutation();

  const handleAdd = async () => {
    try {
      await addItemToCart({ productId: product._id, quantity: 1 }).unwrap();
      console.log("נוסף לעגלה בהצלחה!");
    } catch (err) {
      console.error("שגיאה בהוספה לעגלה:", err);
    }
  };

  return (
    <button onClick={handleAdd}>
      הוסף לסל
    </button>
  );
};

export default AddItemToCart;
