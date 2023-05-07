import "./App.css";
import { VideoList } from "./components/MainPage/VideoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoPage } from "./components/VideoPage/VideoPage";
import { UploadPage } from "./components/UploadPage/UploadPage";
import Header from "./components/AllPages/Header";
import BackgroundWave from "./components/AllPages/BackgroundWave"
import { PasswordChange } from "./components/LoginPage/PasswordChange";
import { LoginRegisterPage } from "./components/LoginPage/LoginRegisterPage";

function App() {
  return (
    <div>
      
      <BackgroundWave />
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VideoList />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/video/upload" element={<UploadPage />} />
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route path="/password_change" element = {<PasswordChange />} />
          </Routes>
        </BrowserRouter>
        
    </div>

  );
}

export default App;
