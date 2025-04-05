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
import AiTutor from "./pages/AiTutor";
import SignupProfessor from "./pages/SignUpProfessor";
import LoginProfessor from "./pages/LoginProfessor";
import Quizzess from "./pages/professordashboard/Quizzess";
import LleaderBoard from "./pages/professordashboard/LleaderBoard";
import Announcementss from "./pages/professordashboard/Announcementss";
import Recognitionn from "./pages/professordashboard/Recognitionn";
import Resourcess from "./pages/professordashboard/Resourcess";
import SstudentProgress from "./pages/professordashboard/SstudentProgress";
import ProfessorDashboard from "./components/ProfessorDashboard";




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
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/professor/dashboard/progress" element={<SstudentProgress />} />
        <Route path="/professor/dashboard/quizzes" element={<Quizzess />} />
        <Route path="/professor/dashboard/leaderboard" element={<LleaderBoard />} />
        <Route path="/professor/dashboard/announcements" element={<Announcementss />} />
        <Route path="/professor/dashboard/recognition" element={<Recognitionn />} />
        <Route path="/professor/dashboard/resources" element={<Resourcess />} />
      </Routes>
    </Router>
  );
}

export default App;
