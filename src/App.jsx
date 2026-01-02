import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { StudentDashboard } from './pages/StudentDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TeacherProfile } from './pages/TeacherProfile';
import { TeacherPremium } from './pages/TeacherPremium';
import { SchoolSpace } from './pages/SchoolSpace';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MethodPage } from './pages/MethodPage';
import { ContactPage } from './pages/ContactPage';

import { QuestionDetail } from './pages/QuestionDetail';
import { ParentPremium } from './pages/ParentPremium';
import { PlanningPage } from './pages/PlanningPage';
import { StagesPage } from './pages/StagesPage';
import { GamesPage } from './pages/GamesPage';
import { TeacherQuizCreator } from './pages/TeacherQuizCreator';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/method" element={<MethodPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/games" element={<GamesPage />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/parent/premium" element={<ParentPremium />} />
        <Route path="/parent/planning" element={<PlanningPage />} />
        <Route path="/parent/stages" element={<StagesPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/quiz-creator" element={<TeacherQuizCreator />} />
        <Route path="/teacher/:id" element={<TeacherProfile />} />
        <Route path="/teacher/premium" element={<TeacherPremium />} />
        <Route path="/school" element={<SchoolSpace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
