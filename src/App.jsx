import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
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
import Engagement from "./pages/Engagement";
// Importera global CSS-fil
import './index.css';  // Här säkerställer vi att global CSS är importerad för alla sidor

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Video />
                <Testimonials />
              </>
            }
          />
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
          <Route path="/engagement" element={<Engagement />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
