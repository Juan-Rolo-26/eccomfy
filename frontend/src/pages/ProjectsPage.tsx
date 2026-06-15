import { Navbar } from '../components/Navbar';
import { Projects } from '../components/Projects';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export const ProjectsPage = () => {
    return (
        <div className="app-container" style={{ background: '#080808', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <SEOHead
                title="Proyectos | Eccomfy Agencia de Software"
                description="Conocé los proyectos de software que desarrollamos para PyMEs."
                canonical="https://eccomfyarg.com/proyectos"
                schema={[]}
            />
            <Navbar />
            <div style={{ position: 'relative', zIndex: 4, background: 'transparent', paddingTop: '100px' }}>
                <Projects />
            </div>
            <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
                <Footer />
            </div>
        </div>
    );
};
