import { Link } from "react-router-dom";
import "../../css/AllPages/mainMeniu.css";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../services/user_redux/store";
import { logoutUser } from "../../services/user_endpoints/userInteractions";

const Header = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser().catch((err) => console.log(err));

    localStorage.removeItem('user');
    localStorage.removeItem('expiration');
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
        <li><Link to={"/"}>All videos</Link></li>
        <li><Link to={"/video/upload"}>Upload video</Link></li>
        {isAuthenticated ? (
          <span>
            <li>
              <Link to={"/profile"}>"{user}" Profile</Link>
            </li>    
            <li>
              <Link to={"/"} onClick={handleLogout}>Logout</Link>
            </li>        
          </span>
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