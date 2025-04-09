import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Startsida from "./pages/Startsida"; 
import Portfolio from "./pages/Portfolio";
import Brollop from "./pages/Brollop";
import Bokning from "./pages/Bokning";
import Kontakt from "./pages/Kontakt";
import Kundgalleri from "./pages/Kundgalleri";
import Sok from "./pages/Sok";
import Priser from "./pages/Priser";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Familj from "./pages/Familj";
import Barn from "./pages/Barn";
import Modell from "./pages/Modell";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Startsida />} /> 
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/brollop" element={<Brollop />} />
          <Route path="/bokning" element={<Bokning />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/kundgalleri" element={<Kundgalleri />} />
          <Route path="/sok" element={<Sok />} />
          <Route path="/priser" element={<Priser />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/familj" element={<Familj />} />
          <Route path="/barn" element={<Barn />} />
          <Route path="/modell" element={<Modell />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
