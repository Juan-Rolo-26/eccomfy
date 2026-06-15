import { Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage } from './HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/proyectos" element={<ProjectsPage />} />
    </Routes>
  );
}

export default App;
