import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SIgnUp";
import Login from "./pages/Login";
import Subjects from "./pages/Subjects";
import BiologyAR from "./pages/BiologyAR"; // Create this page




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/biology" element={<BiologyAR />} />
      </Routes>
    </Router>
  );
}

export default App;
