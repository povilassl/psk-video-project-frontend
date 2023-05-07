import { Link } from "react-router-dom";
import "../../css/AllPages/mainMeniu.css";

const Header = () => {
  return (
      <nav className="main-nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <Link to="/" className="title">Videoteka</Link>
        <ul className="navlinks" style={{zIndex: '1000'}}>
          <li><Link to="/">All videos</Link></li>
          <li><Link to="/video/upload">Upload video</Link></li>
          <li><Link to="/login">Join us</Link></li>
        </ul>
      </nav>
  );
};

export default Header;