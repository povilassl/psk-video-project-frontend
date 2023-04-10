import "./App.css";
import { VideoList } from "./components/VideoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoPage } from "./components/VideoPage";
import { UploadPage } from "./components/UploadPage";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/video/upload" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
