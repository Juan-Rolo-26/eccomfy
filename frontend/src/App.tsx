import { Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage } from './HomePage';
import { ServiceDetail } from './components/ServiceDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios/:serviceId" element={<ServiceDetail />} />
    </Routes>
  );
}

export default App;
