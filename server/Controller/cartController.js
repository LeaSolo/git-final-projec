const Cart = require("../modules/cart")
const Product = require("../modules/product")

const getcart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    
    if (!cart)
      return res.json({ product: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בקבלת הסל' });
  }
}

const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    //בודקים שיש את המוצר הזה
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    //שולפים את הסל של המשתמש לפי הטוקן
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      //בודקים אם שי כבר את המוצר בעגלה
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      //אם כן-מעלים את הכמות
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        //מוסיפים מוצר חדש לסל
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // אין עגלה-יוצרים סל חדש
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    }
    //שומרים את העגלה במסד נתונים
    const TheCart = await cart.save();
    //מחזירים את הסל המעודכן
    res.status(201).json(TheCart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not add item to cart', error: error.message });
  }
};



const removeCartItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }


    cart.items[itemIndex].quantity = quantity;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בעדכון כמות' });
  }
};

module.exports = { getcart, addItemToCart, removeCartItem, updateQuantity };