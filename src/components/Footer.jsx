import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer-title">NABASKI</h3>
      <p className="footer-name">Nathalie Baskin</p>
      <ul className="footer-links"></ul>
      <div className="footer-icons">
        <a href="https://www.facebook.com/namahka"><i className="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com/namahka/"><i className="fab fa-instagram"></i></a>
      </div>
    </footer>
  );
}

export default Footer;
