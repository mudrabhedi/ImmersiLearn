import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SIgnUp";
import Login from "./pages/Login";
import Subjects from "./pages/Subjects";
import BiologyAR from "./pages/BiologyAR"; // Create this page
import ChemistryAR from "./pages/ChemistryAR";
import Leaderboards from './pages/Leaderboards';
import Quizzes from './pages/Quizzes';
import LevelsRewards from './pages/LevelsRewards';
import Profile from './pages/Profile';
import Navbar from "./components/Navbar";
import AiTutor from "./pages/Aitutor";
import SignupProfessor from "./pages/SignUpProfessor";
import LoginProfessor from "./pages/LoginProfessor";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup-professor" element={<SignupProfessor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-professor" element={<LoginProfessor />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/biology" element={<BiologyAR />} />
        <Route path="/subjects/chemistry" element={<ChemistryAR />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/levels-rewards" element={<LevelsRewards />} />
        <Route path="/ai-tutor" element={<AiTutor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
