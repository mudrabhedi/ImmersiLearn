import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SIgnUp";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
