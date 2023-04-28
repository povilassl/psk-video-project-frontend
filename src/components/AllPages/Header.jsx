import "../../css/AllPages/mainMeniu.css";

const Header = () => {
  return (
      <nav className="main-nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check" for='check' className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <a href="/" className="title">Videoteka</a>
        <ul className="navlinks" style={{zIndex: '1000'}}>
          <li><a href="/">All videos</a></li>
          <li><a href="/video/upload">Upload video</a></li>
          <li><a href="/login">Join us</a></li>
        </ul>
      </nav>
  );
};

export default Header;