import { useCartStore, CartItem } from '../store/cartStore';
import Navbar from '../components/Navbar';
import './Cart.css';

const Cart = () => {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const handleIncreaseQuantity = (item: CartItem) => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.quantity - 1);
    } else {
      removeItem(item._id);
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='cart-container'>
        <h2>Your Shopping Cart</h2>
        <div className='cart-items'>
          {items.map((item) => (
            <div className='cart-item' key={item._id}>
              <div className='item-image'>
                {item.image && <img src={item.image} alt={item.name} />}
              </div>
              <div className='item-info'>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className='item-quantity'>
                <button
                  className='quantity-btn'
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className='quantity-btn'
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </button>
              </div>
              <div className='item-price'>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className='remove-btn'
                onClick={() => removeItem(item._id)}
              >
                BIN
              </button>
            </div>
          ))}
        </div>
        <div className='cart-summary'>
          <div className='cart-total'>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className='cart-actions'>
            <button className='clear-btn' onClick={clearCart}>
              Clear Cart
            </button>
            <button className='checkout-btn'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
