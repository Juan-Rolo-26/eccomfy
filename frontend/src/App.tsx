import { Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage } from './HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SoftwarePage } from './pages/SoftwarePage';
import { AppPage } from './pages/AppPage';
import { TravelPage } from './pages/TravelPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/proyectos" element={<ProjectsPage />} />
      <Route path="/software" element={<SoftwarePage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/apps" element={<AppPage />} />
      <Route path="/agencia-viajes" element={<TravelPage />} />
      <Route path="/agencia-viaje" element={<TravelPage />} />
    </Routes>
  );
}

export default App;
