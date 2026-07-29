import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

// Website screenshots
import imgMagna from '../assets/Magna_web.png';
import imgAmes from '../assets/Ames_web.png';
import imgTopo from '../assets/topotoursweb.png';
import imgCeli from '../assets/celicakeweb.png';
import imgTraviesa from '../assets/Traviesa_logo.jpeg';
import imgVolquetes from '../assets/web volquetes roldan .png';
import imgDodilix from '../assets/dodilix_web.png';

type Project = {
    name: string;
    title: string;
    image: string;
    url: string;
    desc: string;
};

const PROJECTS_DATA: Project[] = [
    {
        name: 'MagnaMKT',
        title: 'Construyendo una presencia digital a la altura',
        image: imgMagna,
        url: 'https://magnamkt.com',
        desc: 'Plataforma web para una agencia de desarrollo. Ecosistema sólido, escalable y convincente que refleja innovación, seguridad y robustez. El objetivo: transformar una propuesta de valor potente en una presencia digital premium.',
    },
    {
        name: 'AMES Mutual',
        title: 'Seriedad, respaldo y cercanía institucional',
        image: imgAmes,
        url: 'https://amesmutual.com',
        desc: 'Sitio institucional que transmite confianza desde el primer clic. Foco en jerarquía visual, claridad del contenido y una arquitectura que refuerza la credibilidad de una entidad financiera.',
    },
    {
        name: 'Topo Tours',
        title: 'Una experiencia digital que invita e inspira',
        image: imgTopo,
        url: 'https://topotours.com',
        desc: 'Plataforma de turismo diseñada para conectar emocionalmente con el usuario desde lo visual. Navegación fluida, diseño atractivo y propuesta clara pensada para convertir visitantes en viajeros.',
    },
    {
        name: 'CeliCake',
        title: 'Estética suave, cuidada y emocional',
        image: imgCeli,
        url: 'https://juan-rolo-26.github.io/celicake-crafted-with-love/',
        desc: 'Presencia digital para una marca de pastelería artesanal. Diseño cálido, cercano y emocional que traduce la identidad humana de la marca en una experiencia web que genera confianza y deseo.',
    },
    {
        name: 'Traviesa',
        title: 'E-commerce de bazar intuitivo y atractivo',
        image: imgTraviesa,
        url: 'https://traviesa.online',
        desc: 'Tienda online de artículos para el hogar. Navegación clara, catálogo bien estructurado y diseño moderno que invita a descubrir. Una web preparada para compras fluidas y experiencia de usuario óptima.',
    },
    {
        name: 'Volquetes Roldán',
        title: 'Presencia digital fuerte para rubros tradicionales',
        image: imgVolquetes,
        url: 'https://volquetesroldan.com',
        desc: 'Un caso que demuestra que cualquier rubro puede tener una presencia digital poderosa. Web clara, funcional y confiable que transmite profesionalismo y activa consultas de clientes potenciales.',
    },
    {
        name: 'Dodilix',
        title: 'Gestión de siniestros digitalizada y eficiente',
        image: imgDodilix,
        url: 'https://www.dodilix.com',
        desc: 'Plataforma integral para digitalizar la gestión de siniestros en el sector asegurador. Flujos intuitivos, interfaz clara y arquitectura preparada para escalar. Tecnología que transforma un sector tradicional.',
    },
];

export const Projects = () => {
    return (
        <section
            className="projects-section"
            id="proyectos"
            aria-label="Portfolio de proyectos de Eccomfy"
        >
            <div className="projects-container">

                {/* Header */}
                <div className="projects-intro">
                    <motion.span
                        className="projects-eyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Nuestros Proyectos
                    </motion.span>
                    <motion.h2
                        className="projects-intro__title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Proyectos que{' '}
                        <span className="projects-gradient-text">transformaron marcas.</span>
                    </motion.h2>
                    <motion.p
                        className="projects-intro__desc"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Cada proyecto es el resultado de una colaboración estratégica. Tecnología, diseño y una visión clara del negocio.
                    </motion.p>
                </div>

                {/* Vertical project list */}
                <div className="projects-grid">
                    {PROJECTS_DATA.map((project, index) => (
                        <motion.article
                            key={project.name}
                            className="project-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-6%' }}
                            transition={{ duration: 0.65, delay: 0.05 }}
                        >
                            {/* ── Image ── */}
                            <div className="project-card__visual">
                                <img
                                    src={project.image}
                                    alt={`${project.name} — ${project.title} | Eccomfy`}
                                    className="project-card__image"
                                    loading="lazy"
                                    decoding="async"
                                    width={900}
                                    height={600}
                                />
                                <div className="project-card__overlay" />
                            </div>

                            {/* ── Info ── */}
                            <div className="project-card__info">
                                <span className="project-card__brand">{project.name}</span>

                                <div className="project-card__hover-content">
                                    <h3 className="project-card__title">{project.title}</h3>
                                    <p className="project-card__desc">{project.desc}</p>
                                </div>

                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-card__link"
                                    aria-label={`Visitar sitio web de ${project.name}`}
                                >
                                    Ver proyecto en vivo
                                    <ArrowUpRight size={16} strokeWidth={2.2} />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
