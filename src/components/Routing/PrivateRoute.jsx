import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return <Outlet />;
};

export default PrivateRoute;
