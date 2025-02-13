import Header from "./components/Header";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Video />
      <Testimonials /> {/* Sektionen med bilder + text */}
      <Footer />
    </div>
  );
}

export default App;
