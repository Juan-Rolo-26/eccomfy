import { Routes, Route } from 'react-router-dom';
import './index.css';
import { HomePage } from './HomePage';
import { ServiceDetail } from './components/ServiceDetail';
import {
  ServiciosIndex, MetaAdsPage, SeoServicePage, DesarrolloWebPage,
  NosotrosPage, BlogPage, ContactoPage, CasosExitoPage,
  BlogEcosistemaDigital, BlogInfoproductos, BlogAgenciaCordoba,
  BlogMetaAdsCoaches, BlogMarcaPersonal, BlogInfoproductoresLatam,
  BlogAgenciaFreelancer, BlogLeadsCalificados
} from './pages/SeoPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios/:serviceId" element={<ServiceDetail />} />

      {/* Orphan SEO Pages */}
      <Route path="/servicios" element={<ServiciosIndex />} />
      <Route path="/servicios/meta-ads" element={<MetaAdsPage />} />
      <Route path="/servicios/seo" element={<SeoServicePage />} />
      <Route path="/servicios/desarrollo-web" element={<DesarrolloWebPage />} />
      <Route path="/nosotros" element={<NosotrosPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/casos-de-exito" element={<CasosExitoPage />} />
      <Route path="/blog/que-es-un-ecosistema-digital" element={<BlogEcosistemaDigital />} />
      <Route path="/blog/como-vender-infoproductos-online-argentina" element={<BlogInfoproductos />} />
      <Route path="/blog/agencia-de-marketing-digital-cordoba" element={<BlogAgenciaCordoba />} />
      <Route path="/blog/meta-ads-para-coaches-y-mentores" element={<BlogMetaAdsCoaches />} />
      <Route path="/blog/como-posicionar-marca-personal-en-google" element={<BlogMarcaPersonal />} />
      <Route path="/blog/marketing-para-infoproductores-latam" element={<BlogInfoproductoresLatam />} />
      <Route path="/blog/diferencia-agencia-freelancer-marketing" element={<BlogAgenciaFreelancer />} />
      <Route path="/blog/como-generar-leads-calificados-para-servicios" element={<BlogLeadsCalificados />} />
    </Routes>
  );
}

export default App;
