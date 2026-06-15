import { motion } from 'framer-motion';

// Logos disponibles en assets
import logoAmes from '../assets/AMES_LOGO_FONDO_AZUL__2_-removebg-preview.png';
import logoTopo from '../assets/logo-topotours.png';
import logoCeli from '../assets/logo_celicake-removebg-preview.png';
import logoVolquetes from '../assets/LOGOTIPO VOLQUETES ROLDAN .png';
import logoMagna from '../assets/logo_Magna.jpg';
import logoTraviesa from '../assets/Traviesa_logo.jpeg';

const BRANDS = [
    { name: 'MagnaMKT', logo: logoMagna, initials: 'MG', color: '#17775b', url: 'https://magnamkt.com' },
    { name: 'AMES Mutual', logo: logoAmes, initials: 'AM', color: '#17775b', url: 'https://amesmutual.com' },
    { name: 'Topo Tours', logo: logoTopo, initials: 'TT', color: '#17775b', url: 'https://topotours.ar' },
    { name: 'CeliCake', logo: logoCeli, initials: 'CC', color: '#17775b', url: 'https://juan-rolo-26.github.io/celicake-crafted-with-love/' },
    { name: 'Traviesa', logo: logoTraviesa, initials: 'TR', color: '#17775b', url: 'https://traviesa.online' },
    { name: 'Volquetes Roldán', logo: logoVolquetes, initials: 'VR', color: '#17775b', url: 'https://volquetesroldan.com' },
];

// Triplicamos para scroll infinito
const TRACK = [...BRANDS, ...BRANDS, ...BRANDS];



export const BrandCarousel = () => {
    return (
        <motion.div
            className="brand-carousel-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Label */}
            <p className="brand-carousel-label">Marcas que confiaron en nosotros</p>

            {/* Track con overflow oculto */}
            <div className="brand-carousel-viewport">
                <div className="brand-carousel-track">
                    {TRACK.map((brand, i) => (
                        <a
                            key={`${brand.name}-${i}`}
                            className="brand-pill"
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Visitar web de ${brand.name}`}
                            aria-label={`Visitar web de ${brand.name}`}
                        >
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={`Logo de ${brand.name} — cliente de Eccomfy agencia de software en Córdoba`}
                                    className="brand-pill-logo"
                                    loading="lazy"
                                    decoding="async"
                                    width={80}
                                    height={32}
                                    style={{ filter: brand.name === 'AMES Mutual' ? 'brightness(0) invert(1)' : 'none' }}
                                />
                            ) : (
                                <span
                                    className="brand-pill-avatar"
                                    style={{ background: brand.color }}
                                >
                                    {brand.initials}
                                </span>
                            )}
                            <span className="brand-pill-name">{brand.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
