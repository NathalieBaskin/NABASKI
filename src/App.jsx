import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import Portfolio from "./pages/Portfolio";
import Brollop from "./pages/Brollop";
import Bokning from "./pages/Bokning";
import Kontakt from "./pages/Kontakt"; // ✅ Kontrollera att denna fil finns
import Kundgalleri from "./pages/Kundgalleri"; // ✅ Kontrollera att denna fil finns
import Sok from "./pages/Sok"; // ✅ Importera söksidan
import Priser from "./pages/Priser";

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
          <Route path="/kundgalleri" element={<Kundgalleri />} /> {/* ✅ Kontrollera att denna fil finns */}
          <Route path="/sok" element={<Sok />} /> {/* ✅ Nu är den inuti <Routes> */}
          <Route path="/priser" element={<Priser />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
