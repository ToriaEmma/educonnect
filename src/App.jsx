import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherProfile } from './pages/TeacherProfile';
import { SchoolSpace } from './pages/SchoolSpace';

export default function App() {
  return (
    <div className="font-sans antialiased text-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/school" element={<SchoolSpace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
