import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SIgnUp";
import Login from "./pages/Login";
import Subjects from "./pages/Subjects";
import BiologyAR from "./pages/BiologyAR"; // Create this page
import ChemistryAR from "./pages/ChemistryAR";
import Leaderboards from './pages/Leaderboards';
import Quizzes from './pages/Quizzes';
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
import HomePage from "./components/HomePage";
import ProfessorProfile from "./pages/professordashboard/ProfessorProfile";

function Layout({ children, showNavbar = true }) {
  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout showNavbar={false}><HomePage /></Layout>} />
        <Route path="/login" element={<Layout showNavbar={false}><Login /></Layout>} />
        <Route path="/signup" element={<Layout showNavbar={false}><SignUp /></Layout>} />
        <Route path="/signup-professor" element={<Layout showNavbar={false}><SignupProfessor /></Layout>} />
        <Route path="/login-professor" element={<Layout showNavbar={false}><LoginProfessor /></Layout>} />
        <Route path="/subjects" element={<Layout showNavbar={true}><Subjects /></Layout>} />
<Route path="/subjects/biology" element={<Layout showNavbar={true}><BiologyAR /></Layout>} />
<Route path="/subjects/chemistry" element={<Layout showNavbar={true}><ChemistryAR /></Layout>} />
<Route path="/leaderboards" element={<Layout showNavbar={true}><Leaderboards /></Layout>} />
<Route path="/quizzes" element={<Layout showNavbar={true}><Quizzes /></Layout>} />
<Route path="/ai-tutor" element={<Layout showNavbar={true}><AiTutor /></Layout>} />
<Route path="/profile" element={<Layout showNavbar={true}><Profile /></Layout>} />
<Route path="/professor/dashboard" element={<Layout showNavbar={false}><ProfessorDashboard /></Layout>} />
<Route path="/professor/dashboard/progress" element={<Layout showNavbar={false}><SstudentProgress /></Layout>} />
<Route path="/professor/dashboard/quizzes" element={<Layout showNavbar={false}><Quizzess /></Layout>} />
<Route path="/professor/dashboard/leaderboard" element={<Layout showNavbar={false}><LleaderBoard /></Layout>} />
<Route path="/professor/dashboard/announcements" element={<Layout showNavbar={false}><Announcementss /></Layout>} />
<Route path="/professor/dashboard/recognition" element={<Layout showNavbar={false}><Recognitionn /></Layout>} />
<Route path="/professor/dashboard/resources" element={<Layout showNavbar={false}><Resourcess /></Layout>} />
<Route path="/professor/dashboard/professorprofile" element={<Layout showNavbar={false}><ProfessorProfile /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
