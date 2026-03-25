import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealText } from './components/ScrollRevealText';
import { VideoShowcase } from './components/VideoShowcase';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { StackingWrapper } from './components/StackingWrapper';

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

            <div style={{ position: 'relative', zIndex: 3, marginTop: '-100vh' }}>
                <VideoShowcase />
            </div>

            <div style={{ position: 'relative', zIndex: 3, background: '#080808' }}>
                <Features />
            </div>

            <div style={{ position: 'relative', zIndex: 4, background: '#080808' }}>
                <Process />
            </div>

            <div style={{ position: 'relative', zIndex: 5, background: '#030303' }}>
                <Faq />
            </div>

            <div style={{ position: 'relative', zIndex: 6, background: '#08111d' }}>
                <Footer />
            </div>
        </div>
    );
};
