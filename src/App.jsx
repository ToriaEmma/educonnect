import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StudentDashboard } from './pages/StudentDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TeacherProfile } from './pages/TeacherProfile';
import { TeacherPremium } from './pages/TeacherPremium';
import { SchoolSpace } from './pages/SchoolSpace';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/:id" element={<TeacherProfile />} />
        <Route path="/teacher/premium" element={<TeacherPremium />} />
        <Route path="/school" element={<SchoolSpace />} />
      </Routes>
    </BrowserRouter>
  );
}
