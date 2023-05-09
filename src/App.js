import "./App.css";
import { VideoList } from "./components/MainPage/VideoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoPage } from "./components/VideoPage/VideoPage";
import Header from "./components/AllPages/Header";
import BackgroundWave from "./components/AllPages/BackgroundWave"
import { PasswordChange } from "./components/LoginPage/PasswordChange";
import { LoginRegisterPage } from "./components/LoginPage/LoginRegisterPage";
import { useDispatch, useSelector  } from 'react-redux';
import PrivateRoute from "./components/Routing/PrivateRoute";
import { useEffect } from "react";
import { logout, login } from "./services/user_redux/store";

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const now = new Date();
        const sessionExpiresAt = new Date(user.cookieExpiration);
        if (now >= sessionExpiresAt) {
          localStorage.removeItem('user');
          dispatch(logout());
        }
      }
    };  

    if (isAuthenticated) {
      const intervalId = setInterval(() => {
        checkSession();
      }, 1000 * 60); // Check every minute

      // Cleanup function to clear the interval when the component is unmounted
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isAuthenticated, dispatch]);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login(user));
    }
  }, [dispatch]);

  return (
    <div>
      <BackgroundWave />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route  path="/video/upload" element={<PrivateRoute  />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/password_change" element={<PasswordChange />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
