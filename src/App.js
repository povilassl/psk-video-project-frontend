import "./App.css";
import {VideoList} from "./components/VideoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VideoPage } from "./components/VideoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
