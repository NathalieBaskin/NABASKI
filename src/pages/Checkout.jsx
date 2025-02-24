import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "card",
  });

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

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
      alert("Vänligen fyll i alla fält");
      return;
    }

    alert(`Tack för ditt köp, ${customerInfo.name}! Din order har genomförts.`);

    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom</p>
      ) : (
        <div>
          <h3>Orderöversikt</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
             <img src={`http://localhost:5000${item.image}`} alt={item.name} width="100" />

              <div>{item.name}</div>
              <div>{item.price} kr</div>
              <div>Antal: {item.quantity}</div>
            </div>
          ))}
          <h3>Totalt: {total} kr</h3>

          <h3>Kunduppgifter</h3>
          <div>
            <label>Namn:</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Adress:</label>
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Betalningsmetod:</label>
            <select
              name="paymentMethod"
              value={customerInfo.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="card">Kort</option>
              <option value="swish">Swish</option>
              <option value="invoice">Faktura</option>
            </select>
          </div>

          <button onClick={handleOrderSubmit}>Slutför köp</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
