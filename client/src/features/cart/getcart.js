import { useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemQtyMutation } from "./cartApiSlice";

const GetCart = () => {
    const { data: cartData, isError, isLoading } = useGetCartQuery();
    const [removeCartItem] = useRemoveCartItemMutation();
    const [updateQuantity] = useUpdateCartItemQtyMutation();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>error</div>;

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id).unwrap();
        } catch (err) {
            console.error('שגיאה בהסרת מוצר מהעגלה', err);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            await updateQuantity({ productId, quantity: newQuantity }).unwrap();
        } catch (err) {
            console.error('שגיאה בעדכון כמות', err);
        }
    };

    return (
  <div>
    <h2>העגלה שלך</h2>
    {cartData?.items?.map((item) => (
      <div key={item._id}>
        <p>{item.product.name} - כמות: {item.quantity}</p>
        <button onClick={() => handleRemove(item._id)}>הסר</button>
        <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
        <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
      </div>
    ))}
  </div>
);

};

export default GetCart;
