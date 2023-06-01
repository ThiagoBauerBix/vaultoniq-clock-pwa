import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EmptyPage from "../pages/EmptyPage";
import PageTemplate from "../components/PageTemplate";
import Timer from "../pages/Timer";
import Photos from "../pages/Photos";
import Scan from "../pages/Scan";
import Notes from "../pages/Notes";
import Review from "../pages/Review";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTemplate />}>
          <Route index element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/review" element={<Review />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
