import { Link } from "react-router-dom";
import "../../css/AllPages/mainMeniu.css";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../services/user_redux/store";
import Cookies from "js-cookie";

const Header = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('VideotekaAuthentication', { domain: '.videoteka.tech' });

    localStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <Link to="/" className="title">Videoteka</Link>
      <ul className="navlinks" style={{ zIndex: '1000' }}>
        <li><Link to={"/notifications"}>Notifications</Link></li>
        <li><Link to={"/"}>All videos</Link></li>
        <li><Link to={"/video/upload"}>Upload video</Link></li>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Logout from {localStorage.getItem('user')}</button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>Join us</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;