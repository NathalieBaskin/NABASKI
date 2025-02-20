import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer-title">NABASKI</h3>
      <ul className="footer-links">
        <li><a href="#">Prislista</a></li>
        <li><a href="#">Kundrecensioner</a></li>
        <li><a href="#">Kundgalleri</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
      <div className="footer-icons">
        <a href="#"><i className="fas fa-envelope"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>
    </footer>
  );
}

export default Footer;
