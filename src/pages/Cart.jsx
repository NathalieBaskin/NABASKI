import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
    calculateTotal(storedItems);
  }, []);

  const calculateTotal = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price * item.quantity;
    });
    setTotal(sum);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems)); 
    navigate("/checkout");
  };

  const handleQuantityChange = (index, type) => {
    const updatedItems = [...cartItems];
    if (type === "increase") {
      updatedItems[index].quantity += 1;
    } else if (type === "decrease" && updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    }
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  return (
    <div className="cart-page">
      <h1>Varukorg</h1>
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                width="100"
              />
              <div>{item.name}</div>
              <div>{item.price} kr</div>
              <div>
                <button onClick={() => handleQuantityChange(index, "decrease")}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(index, "increase")}>
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveItem(index)}>Ta bort</button>
            </div>
          ))}
          <div>
            <h3>Total: {total} kr</h3>
            <button onClick={handleCheckout}>Till Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
