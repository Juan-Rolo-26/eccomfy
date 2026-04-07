import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { Features } from './components/Features';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';
import { CalendlyButton } from './components/CalendlyButton';

export const HomePage = () => {
    return (
        <div className="app-container" style={{ background: '#080808' }}>
            <Navbar />

            <StackingWrapper zIndex={1}>
                <Hero />
            </StackingWrapper>

            <div style={{ position: 'relative', zIndex: 2 }}>
                <ScrollRevealText />
            </div>

            {/* Botón de consultoría gratuita — debajo del video/ecosistema */}
            <div style={{ position: 'relative', zIndex: 3, background: '#f2f0ea', width: '100%', overflow: 'hidden' }}>
                <CalendlyButton />
            </div>

            <div style={{ position: 'relative', zIndex: 3, background: '#080808' }}>
                <Features />
            </div>


            <div style={{ position: 'relative', zIndex: 4, background: 'transparent' }}>
                <Projects />
            </div>

            <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
                <Footer />
            </div>
        </div>
    );
};
