import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;