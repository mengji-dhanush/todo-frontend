import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Todo";
import Signup from "./components/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
