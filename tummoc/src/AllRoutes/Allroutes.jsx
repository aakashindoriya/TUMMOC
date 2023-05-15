import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<h1>page not found</h1>} />
    </Routes>
  );
}
