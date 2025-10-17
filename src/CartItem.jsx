import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const [showComingSoon, setShowComingSoon] = useState(false);

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Convert "$15" → 15
      const numericCost = parseFloat(item.cost.toString().replace('$', ''));
      total += numericCost * item.quantity;
    });
    return total.toFixed(2);
  };

  // ✅ Continue shopping handler
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) onContinueShopping(e);
  };

  // ✅ Checkout placeholder function
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // ✅ Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement item quantity (remove if it drops to 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Calculate total cost per item (subtotal)
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.toString().replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        {!showComingSoon ? (
            <button onClick={() => setShowComingSoon(true)}>Checkout</button>
          ) : (
            <p style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}>
              Coming soon!!!
            </p>
          )}
      </div>
    </div>
  );
};

export default CartItem;


