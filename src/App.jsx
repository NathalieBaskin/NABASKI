import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import Portfolio from "./pages/Portfolio";

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
                <Video /> {/* Videon direkt under headern */}
                <Testimonials /> {/* Testimonials-sektionen med bilder och text */}
              </>
            }
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/kontakt" element={<h1>Kontakt</h1>} />
          <Route path="/kundgalleri" element={<h1>Kundgalleri</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
