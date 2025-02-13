import Header from "./components/Header";
import Video from "./components/Video";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Video />  {/* Videon ligger direkt under headern */}
      <div className="content">
      </div>
      <Footer />
    </div>
  );
}

export default App;
