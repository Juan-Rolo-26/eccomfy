import { Navbar } from '../components/Navbar';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export const ServicesPage = () => {
    return (
        <div className="app-container light-nav" style={{ background: '#f2f0ea', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Servicios | Eccomfy Agencia Digital — Community Manager, Meta Ads, Filmmaker"
                description="Servicios de agencia digital: community manager, fotografía y video profesional, estrategia de marketing, campañas en Meta Ads y desarrollo web. Eccomfy, Córdoba Argentina."
                canonical="https://eccomfyarg.com/servicios"
                schema={[]}
            />
            <Navbar />
            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea', paddingTop: '100px' }}>
                <Features />
            </div>
            <div style={{ position: 'relative', zIndex: 6, background: 'var(--bg-color)' }}>
                <Footer />
            </div>
        </div>
    );
};
