import { Navbar } from '../components/Navbar';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export const ServicesPage = () => {
    return (
        <div className="app-container" style={{ background: '#080808', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Servicios | Eccomfy Agencia de Software"
                description="Servicios de software para PyMEs: desarrollo a medida, apps móviles, y automatización con IA."
                canonical="https://eccomfyarg.com/servicios"
                schema={[]}
            />
            <Navbar />
            <div style={{ position: 'relative', zIndex: 3, background: '#080808', paddingTop: '100px' }}>
                <Features />
            </div>
            <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
                <Footer />
            </div>
        </div>
    );
};
