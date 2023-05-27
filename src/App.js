import "./App.css";
import { VideoList } from "./components/MainPage/VideoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoPage } from "./components/VideoPage/VideoPage";
import Header from "./components/AllPages/Header";
import BackgroundWave from "./components/AllPages/BackgroundWave"
import { LoginRegisterPage } from "./components/LoginPage/LoginRegisterPage";
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from "./components/Routing/PrivateRoute";
import { useEffect } from "react";
import { logout, login } from "./services/user_redux/store";
import { Notification } from "./components/AllPages/Notification";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadPage } from "./components/UploadPage/UploadPage";
import { Profile } from "./components/UserPage/Profile";
import { logoutUser } from "./services/user_endpoints/userInteractions";
import { toast } from 'react-toastify';
import { PasswordChange } from "./components/LoginPage/PasswordChange";
import { connection_user, connection } from "./services/SignalR/connect";

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const createSignalRConnection = () => {
      // Stop the existing connection (if any)
      connection_user.stop();

      // Create a new connection with the updated user token
      connection_user
        .start()
        .then(() => console.log("Connection established."))
        .catch((error) => console.error(error));
    };

    if (isAuthenticated) {
      createSignalRConnection(); // Call the function to create a new SignalR connection
    }

    // Clean up the SignalR connection when the component unmounts
    return () => {
      connection_user.off("ReceiveNotification");
      connection_user.stop();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const checkSession = () => {
      const expiration = JSON.parse(localStorage.getItem('expiration'));
      if (expiration) {
        const now = new Date();
        const sessionExpiresAt = new Date(expiration);
        if (now >= sessionExpiresAt) {
          localStorage.removeItem('user');
          localStorage.removeItem('expiration');
          logoutUser();
          dispatch(logout());
        }
      }
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login(user));
    }

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
    // Start the SignalR connection
    connection
      .start()
      .then(() => console.log("Connection established."))
      .catch((error) => console.error(error));

    // Handle the "ReceiveNotification" event
    connection.on("ReceiveNotification", (message) => {
      toast(message)
    });

    // Clean up the SignalR connection when the component unmounts
    return () => {
      connection.off("ReceiveNotification");
      connection.stop();
    };
  }, []);

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
          <Route path="/video/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path="/password_change" element={<PasswordChange />} />
        </Routes>
        <ToastContainer position={'top-left'}
          theme={'dark'}
        // autoClose={false}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
