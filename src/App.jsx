import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import Portfolio from "./pages/Portfolio";
import Brollop from "./pages/Brollop";
import Bokning from "./pages/Bokning"; // ✅ Importera bokningssidan

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
          <Route path="/bokning" element={<Bokning />} /> {/* ✅ Lägg till bokningssidan */}
          <Route path="/kontakt" element={<h1>Kontakt</h1>} />
          <Route path="/kundgalleri" element={<h1>Kundgalleri</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
