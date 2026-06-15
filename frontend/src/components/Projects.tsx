import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import './Projects.css';

// Website screenshots
import imgMagna from '../assets/Magna_web.png';
import imgAmes from '../assets/Ames_web.png';
import imgTopo from '../assets/topotoursweb.png';
import imgCeli from '../assets/celicakeweb.png';
import imgTraviesa from '../assets/Traviesa_logo.jpeg';
import imgVolquetes from '../assets/web volquetes roldan .png';

type Project = {
    name: string;
    title: string;
    image: string;
    url: string;
    story: string[];
};

const PROJECTS_DATA: Project[] = [
    {
        name: 'MagnaMKT',
        title: 'Construyendo una presencia digital a la altura',
        image: imgMagna,
        url: 'https://magnamkt.com',
        story: [
            'Trabajar con MagnaMKT fue sumergirnos en el mundo de una marca que ya tenía una visión clara sobre el crecimiento, el software y la infraestructura digital. Desde el inicio, entendimos que no se trataba simplemente de hacer una web "linda", sino de construir una plataforma que estuviera a la altura del nivel de complejidad tecnológica que la marca necesitaba.',
            'MagnaMKT necesitaba un ecosistema sólido, escalable y convincente. Un sistema capaz de reflejar no solo sus servicios, sino también la sensación de innovación, seguridad y robustez que hay detrás de una agencia de desarrollo.',
            'Fue un proyecto donde nos enfocamos mucho en la estructura del mensaje, en la forma en la que los servicios debían presentarse y en cómo hacer que todo el sitio respirara una identidad más premium y confiable.',
            'Con MagnaMKT, el trabajo fue transformar una propuesta de valor potente en una presencia digital a la altura. Y eso, para nosotros, es una de las partes más lindas de lo que hacemos.',
        ],
    },
    {
        name: 'AMES Mutual',
        title: 'Seriedad, respaldo y cercanía',
        image: imgAmes,
        url: 'https://amesmutual.com',
        story: [
            'El caso de AMES Mutual fue distinto y muy interesante, porque implicó entrar en un universo mucho más institucional, donde la comunicación necesitaba transmitir seriedad, respaldo y cercanía al mismo tiempo.',
            'Desde Eccomfy entendimos que la web tenía que generar confianza desde el primer momento. Tenía que comunicar orden, formalidad y estructura, pero sin sentirse distante ni rígida.',
            'En este trabajo hubo mucho foco en la claridad del contenido, en la jerarquía visual y en la forma en la que la marca debía presentarse para resultar más accesible sin perder peso institucional.',
            'Lo que más valoramos de este proyecto fue justamente eso: haber podido construir una web que no solo muestra información, sino que ayuda a reforzar la credibilidad de una entidad que trabaja todos los días acompañando a otras personas en su desarrollo.',
        ],
    },
    {
        name: 'Topo Tours',
        title: 'Una experiencia digital que invita, inspira y motiva',
        image: imgTopo,
        url: 'https://topotours.ar',
        story: [
            'Con Topo Tours el proceso tuvo una energía totalmente distinta. Entramos en una marca vinculada a los viajes, a las experiencias y a esa emoción previa que aparece cuando una persona empieza a imaginar un destino.',
            'Una marca de turismo necesita conectar desde lo visual, desde lo emocional y desde la facilidad con la que presenta su propuesta.',
            'Nos enfocamos en que la marca se sintiera cercana, clara y atractiva. Buscamos que la navegación acompañara esa lógica de descubrimiento.',
            'Trabajar con Topo Tours nos permitió construir una presencia que acompaña mucho mejor el espíritu de una marca que vende experiencias.',
        ],
    },
    {
        name: 'CeliCake',
        title: 'Una estética suave, cuidada y emocional',
        image: imgCeli,
        url: 'https://juan-rolo-26.github.io/celicake-crafted-with-love/',
        story: [
            'El proyecto de CeliCake tuvo una sensibilidad muy especial. Desde el primer momento se sintió como una marca con alma, con calidez, con dedicación.',
            'En este tipo de marcas, la presentación lo es todo. El público necesita sentir cercanía, seguridad y autenticidad.',
            'Fue un proyecto en el que disfrutamos mucho el lado visual, pero también la parte emocional de la construcción de marca.',
            'Lo que más nos gustó de este proyecto fue poder acompañar una identidad tan humana y traducirla a una presencia digital que no pierda ese encanto.',
        ],
    },
    {
        name: 'Traviesa',
        title: 'Una tienda online de bazar intuitiva y atractiva',
        image: imgTraviesa,
        url: 'https://traviesa.online',
        story: [
            'Con Traviesa el objetivo fue llevar su negocio de bazar al mundo digital, creando un e-commerce que no solo mostrara productos, sino que invitara a descubrir detalles para el hogar.',
            'Un catálogo de bazar necesita orden y claridad. Nos enfocamos fuertemente en que la navegación sea intuitiva, permitiendo que los clientes encuentren rápidamente lo que buscan y se sorprendan con novedades.',
            'Fue un proyecto donde trabajamos la estructura visual para destacar la variedad de artículos, manteniendo siempre un diseño amigable, cálido y moderno.',
            'El resultado es una web sólida, preparada para compras fluidas, que refleja la esencia de Traviesa: diseño, practicidad y estilo en cada hogar.',
        ],
    },
    {
        name: 'Volquetes Roldán',
        title: 'Una presencia digital fuerte, profesional y pensada',
        image: imgVolquetes,
        url: 'https://volquetesroldan.com',
        story: [
            'El caso de Volquetes Roldán nos gusta especialmente porque representa algo en lo que creemos mucho: que incluso los rubros más tradicionales pueden tener una presencia digital fuerte.',
            'En Volquetes Roldán, el objetivo principal era lograr una web clara, confiable y funcional.',
            'Nos enfocamos en ordenar la información, jerarquizar correctamente los servicios y construir una imagen digital que diera una sensación de empresa activa, seria y preparada para responder.',
            'Fue un proyecto muy valioso para nosotros porque muestra perfectamente algo que defendemos mucho en Eccomfy: una buena presencia digital no es un lujo, es una herramienta de crecimiento.',
        ],
    },
];

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Escucha el evento disparado por BrandCarousel en el Hero
    useEffect(() => {
        const handleOpenProject = (e: Event) => {
            const name = (e as CustomEvent<{ name: string }>).detail.name;
            const found = PROJECTS_DATA.find(p => p.name === name);
            if (found) setSelectedProject(found);
        };
        window.addEventListener('open-project', handleOpenProject);
        return () => window.removeEventListener('open-project', handleOpenProject);
    }, []);

    if (selectedProject) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <section
            className="projects-section"
            id="proyectos"
            aria-label="Portfolio de proyectos de software de Eccomfy — Córdoba, Argentina"
        >
            <div className="projects-container">

                {/* Intro */}
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
                        Proyectos de software que{' '}
                        <br />
                        <span className="projects-gradient-text">transformaron PyMEs.</span>
                    </motion.h2>
                    <motion.p
                        className="projects-intro__desc"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        En Eccomfy, agencia de software para PyMEs en Córdoba y Argentina, cada
                        proyecto es mucho más que código. Detrás de cada sistema, app o landing
                        page hay un negocio real escalando con tecnología accesible y efectiva.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="projects-grid">
                    {PROJECTS_DATA.map((project, index) => (
                        <motion.article
                            key={project.name}
                            className="project-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-8%' }}
                            transition={{ duration: 0.7, delay: index * 0.08 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="project-card__visual">
                                <img
                                    src={project.image}
                                    alt={`Proyecto de software "${project.name}" - ${project.title} | Eccomfy agencia de software para PyMEs en Córdoba, Argentina`}
                                    className="project-card__image"
                                    loading="lazy"
                                    decoding="async"
                                    width={800}
                                    height={500}
                                />
                                <div className="project-card__overlay" />

                                {/* Bottom info bar */}
                                <div className="project-card__info">
                                    <span className="project-card__brand">{project.name}</span>
                                    <div className="project-card__arrow">
                                        <ArrowUpRight strokeWidth={2} size={18} />
                                    </div>
                                </div>

                                {/* Hover title */}
                                <div className="project-card__hover-content">
                                    <p className="project-card__title">{project.title}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Story Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="project-modal-content"
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="project-modal-close"
                                onClick={() => setSelectedProject(null)}
                                aria-label="Cerrar"
                            >
                                <X size={22} />
                            </button>
                            <div className="project-modal-body">
                                <span className="project-modal-label">{selectedProject.name}</span>
                                <h2>{selectedProject.title}</h2>

                                {/* Visit website link */}
                                <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-modal-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={16} />
                                    Visitar sitio web
                                </a>

                                <img
                                    src={selectedProject.image}
                                    alt={`Proyecto de software "${selectedProject.title}" para ${selectedProject.name} desarrollado por Eccomfy — agencia de software para PyMEs en Córdoba, Argentina`}
                                    className="project-modal-img"
                                    loading="lazy"
                                    decoding="async"
                                    width={960}
                                    height={600}
                                />
                                <div className="project-modal-text">
                                    {selectedProject.story.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>

                                {/* Bottom CTA link */}
                                <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-modal-cta"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Ver proyecto en vivo
                                    <ArrowUpRight size={16} strokeWidth={2.2} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
