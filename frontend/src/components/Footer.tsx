import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUp, ArrowUpRight, X } from 'lucide-react';

type LegalDocKey = 'terms' | 'privacy' | 'cookies';

type FooterLinkItem =
    | { label: string; href: string; external?: false }
    | { label: string; href: string; external: true }
    | { label: string; legal: LegalDocKey };

type FooterMetaItem =
    | { label: string; href: string; external?: false }
    | { label: string; href: string; external: true };

type FooterColumn = {
    title: string;
    links?: FooterLinkItem[];
    note?: string;
    meta?: FooterMetaItem[];
};

type LegalSection = {
    heading: string;
    paragraphs: string[];
};

type LegalDocument = {
    title: string;
    intro: string;
    highlight: string;
    sections: LegalSection[];
};

type LegalReference = {
    label: string;
    href: string;
};

const FOOTER_COLUMNS: FooterColumn[] = [
    {
        title: 'Navegación',
        links: [
            { label: 'Inicio', href: '#inicio' },
            { label: 'Nosotros', href: '#nosotros' },
            { label: 'Servicios', href: '#servicios' },
            { label: 'Proyectos', href: '#proyectos' },
            { label: 'Proceso', href: '#proceso' },
            { label: 'Contacto', href: '#contacto' },
        ],
    },
    {
        title: 'Servicios de Software',
        links: [
            { label: 'Software a Medida', href: '#servicios' },
            { label: 'Apps Móviles', href: '#servicios' },
            { label: 'Inteligencia Artificial', href: '#servicios' },
            { label: 'Desarrollo Web', href: '#servicios' },
        ],
    },
    {
        title: 'Proceso',
        links: [
            { label: 'Descubrimiento', href: '#nosotros' },
            { label: 'Estrategia', href: '#nosotros' },
            { label: 'Diseño UX/UI', href: '#servicios' },
            { label: 'Desarrollo', href: '#servicios' },
            { label: 'Escalado', href: '#servicios' },
        ],
    },
    {
        title: 'Empresa',
        meta: [
            { label: 'Córdoba, Argentina', href: 'https://maps.google.com/?q=Cordoba+Argentina', external: true },
            { label: '+54 351 371-2759', href: 'tel:+543513712759', external: true },
            { label: 'contacto@eccomfyarg.com', href: 'mailto:contacto@eccomfyarg.com', external: true },
        ],
        links: [
            { label: 'Términos y Condiciones', legal: 'terms' },
            { label: 'Política de Privacidad', legal: 'privacy' },
            { label: 'Cookies', legal: 'cookies' },
        ],
    },
    {
        title: 'Redes Sociales',
        links: [
            { label: 'Instagram', href: 'https://www.instagram.com/eccomfyarg', external: true },
            { label: 'TikTok', href: 'https://www.tiktok.com/@eccomfy', external: true },
            { label: 'Contacto por email', href: 'mailto:contacto@eccomfyarg.com', external: true },
            { label: 'Llamar ahora', href: 'tel:+543513712759', external: true },
        ],
    },
];

const LEGAL_DOCUMENTS: Record<LegalDocKey, LegalDocument> = {
    terms: {
        title: 'Términos y Condiciones',
        intro:
            'Estos términos regulan el uso del sitio web de Eccomfy y el vínculo inicial con personas o empresas interesadas en nuestros servicios digitales.',
        highlight:
            'Borrador orientativo para sitio institucional. Debe validarse con asesoría legal antes de publicarse como versión definitiva.',
        sections: [
            {
                heading: '1. Alcance del sitio',
                paragraphs: [
                    'Este sitio tiene por finalidad informar sobre los servicios, proyectos y soluciones de Eccomfy. La navegación del sitio implica la aceptación de estas condiciones de uso.',
                    'El contenido publicado tiene carácter informativo y comercial. La contratación efectiva de servicios se formaliza únicamente a través de propuestas, presupuestos, acuerdos específicos o contratos posteriores.',
                ],
            },
            {
                heading: '2. Uso permitido',
                paragraphs: [
                    'La persona usuaria se compromete a utilizar este sitio de manera lícita, sin afectar derechos de terceros, sin intentar vulnerar la seguridad del sitio y sin emplear los contenidos con fines ilegales o engañosos.',
                    'Eccomfy podrá restringir el acceso o tomar medidas ante conductas que comprometan la integridad del sitio, su funcionamiento o la seguridad de la información.',
                ],
            },
            {
                heading: '3. Información y contratación',
                paragraphs: [
                    'Toda información relevante sobre servicios, alcances, presupuestos y modalidades de trabajo debe brindarse de manera clara, conforme al deber de información que reconoce la Ley 24.240 de Defensa del Consumidor.',
                    'Los precios, plazos, entregables y condiciones económicas definitivas se acuerdan de forma particular en cada propuesta comercial o contrato.',
                ],
            },
            {
                heading: '4. Propiedad intelectual',
                paragraphs: [
                    'Los textos, diseños, piezas gráficas, identidad visual, desarrollos y demás contenidos de este sitio pertenecen a Eccomfy o se utilizan con autorización.',
                    'No está permitida su reproducción, distribución, modificación o uso comercial sin autorización previa y expresa.',
                ],
            },
            {
                heading: '5. Limitación de responsabilidad',
                paragraphs: [
                    'Eccomfy procura mantener la información actualizada y el sitio disponible, pero no garantiza la ausencia absoluta de errores, interrupciones o incompatibilidades técnicas.',
                    'La empresa no responde por daños derivados del uso indebido del sitio, de fallas externas, de servicios de terceros o de decisiones tomadas exclusivamente en base al contenido informativo publicado.',
                ],
            },
            {
                heading: '6. Jurisdicción y modificaciones',
                paragraphs: [
                    'Eccomfy puede actualizar estos términos en cualquier momento. La versión vigente será la publicada en este sitio.',
                    'Cualquier cuestión vinculada al uso del sitio se interpretará conforme a la normativa aplicable en la República Argentina, sin perjuicio de los derechos irrenunciables que correspondan a consumidores y usuarios.',
                ],
            },
        ],
    },
    privacy: {
        title: 'Política de Privacidad',
        intro:
            'Esta política explica cómo Eccomfy recopila, utiliza y protege los datos personales que una persona comparte al navegar el sitio o al completar formularios de contacto.',
        highlight:
            'Contenido orientativo alineado con principios de la Ley 25.326 de Protección de Datos Personales y el deber de información sobre finalidades, responsables y derechos del titular.',
        sections: [
            {
                heading: '1. Datos que podemos recopilar',
                paragraphs: [
                    'Podemos recibir datos identificatorios y de contacto como nombre, correo electrónico, teléfono, empresa, cargo, mensaje y cualquier otra información que la persona usuaria envíe voluntariamente.',
                    'También podemos registrar datos técnicos de navegación, tales como dispositivo, navegador, páginas visitadas, fecha, hora e interacciones generales con el sitio.',
                ],
            },
            {
                heading: '2. Finalidad del tratamiento',
                paragraphs: [
                    'Los datos se utilizan para responder consultas, elaborar propuestas comerciales, mejorar la experiencia del sitio, analizar rendimiento y mantener comunicaciones vinculadas a nuestros servicios.',
                    'No deben utilizarse para finalidades incompatibles con aquellas informadas al momento de su recolección.',
                ],
            },
            {
                heading: '3. Base de tratamiento y consentimiento',
                paragraphs: [
                    'Cuando corresponde, el tratamiento se apoya en el consentimiento libre, expreso e informado de la persona titular, tal como prevé la Ley 25.326.',
                    'En algunos casos, ciertos datos pueden tratarse cuando resulten necesarios para una relación precontractual o contractual, para cumplir obligaciones legales o para sostener el funcionamiento básico del sitio.',
                ],
            },
            {
                heading: '4. Conservación y seguridad',
                paragraphs: [
                    'Eccomfy adopta medidas razonables de seguridad para resguardar la confidencialidad e integridad de la información.',
                    'Los datos se conservan únicamente durante el tiempo necesario para cumplir la finalidad informada, atender solicitudes, sostener la relación comercial o cumplir obligaciones legales aplicables.',
                ],
            },
            {
                heading: '5. Derechos de las personas usuarias',
                paragraphs: [
                    'La persona titular puede solicitar acceso, rectificación, actualización o supresión de sus datos personales, así como revocar consentimientos cuando corresponda.',
                    'En Argentina, estos derechos se encuentran reconocidos por la Ley 25.326 y pueden ejercerse ante el responsable del tratamiento. Si la respuesta fuera insuficiente, también existen vías de reclamo ante la autoridad competente.',
                ],
            },
            {
                heading: '6. Contacto',
                paragraphs: [
                    'Para consultas sobre privacidad o para ejercer derechos sobre datos personales, podés comunicarte con Eccomfy a través de los canales publicados en este sitio.',
                ],
            },
        ],
    },
    cookies: {
        title: 'Política de Cookies',
        intro:
            'Esta política describe el uso de cookies y tecnologías similares en el sitio de Eccomfy, así como las opciones disponibles para administrarlas.',
        highlight:
            'Las cookies pueden asociarse a datos de navegación y, dependiendo del caso, su tratamiento debe informarse de forma clara junto con la finalidad y las opciones de gestión disponibles para la persona usuaria.',
        sections: [
            {
                heading: '1. Qué son las cookies',
                paragraphs: [
                    'Las cookies son pequeños archivos que un sitio puede almacenar en el navegador para recordar información de navegación, preferencias o métricas de uso.',
                ],
            },
            {
                heading: '2. Tipos de cookies que podemos usar',
                paragraphs: [
                    'Cookies esenciales: permiten funciones básicas del sitio, como estabilidad, seguridad y navegación correcta.',
                    'Cookies analíticas: ayudan a entender cómo interactúan las personas con el sitio para mejorar contenido, rendimiento y experiencia.',
                    'Cookies de personalización o marketing: pueden utilizarse para adaptar contenidos, campañas o medir resultados de acciones comerciales, siempre que corresponda y de acuerdo con la configuración elegida por la persona usuaria.',
                ],
            },
            {
                heading: '3. Gestión y control',
                paragraphs: [
                    'Cada persona puede configurar su navegador para aceptar, bloquear o eliminar cookies. La desactivación de ciertas cookies puede afectar el funcionamiento normal del sitio.',
                    'Cuando el sitio incorpore herramientas de medición o servicios de terceros, Eccomfy procurará informar su presencia y el alcance general de su uso.',
                ],
            },
            {
                heading: '4. Cookies de terceros',
                paragraphs: [
                    'Algunas funcionalidades pueden depender de herramientas externas, como servicios de analítica, reproducción de video, mapas o redes sociales. En esos casos, los terceros pueden establecer sus propias cookies conforme a sus políticas.',
                ],
            },
            {
                heading: '5. Actualizaciones',
                paragraphs: [
                    'Eccomfy puede actualizar esta política para reflejar cambios técnicos, operativos o regulatorios. La versión vigente será la publicada en este sitio.',
                ],
            },
        ],
    },
};

const LEGAL_REFERENCES: LegalReference[] = [
    {
        label: 'AAIP: derechos sobre datos personales',
        href: 'https://www.argentina.gob.ar/aaip/datospersonales/derechos',
    },
    {
        label: 'Ley 25.326 de Protección de Datos Personales',
        href: 'https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion',
    },
    {
        label: 'Ley 24.240 de Defensa del Consumidor',
        href: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm',
    },
];

export const Footer = () => {
    const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocKey | null>(null);

    const activeDocument = useMemo(
        () => (activeLegalDoc ? LEGAL_DOCUMENTS[activeLegalDoc] : null),
        [activeLegalDoc],
    );

    useEffect(() => {
        if (!activeLegalDoc) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveLegalDoc(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeLegalDoc]);

    useEffect(() => {
        document.body.style.overflow = activeLegalDoc ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeLegalDoc]);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer id="contacto" className="footer">
                <div className="footer__shell">
                    <header className="footer__hero">
                        <span className="footer__eyebrow">Agencia de Software · Argentina</span>
                        <h2 className="footer__wordmark">ECCOMFY</h2>
                    </header>

                    <div className="footer__grid">
                        {FOOTER_COLUMNS.map((column) => (
                            <section key={column.title} className="footer__col">
                                <h3 className="footer__col-title">{column.title}</h3>

                                {column.note && <p className="footer__note">{column.note}</p>}

                                {column.meta && (
                                    <div className="footer__meta">
                                        {column.meta.map((item) => (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                target={'external' in item && item.external ? '_blank' : undefined}
                                                rel={'external' in item && item.external ? 'noreferrer' : undefined}
                                                className="footer__meta-link"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {column.links && (
                                    <ul className="footer__links">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                {'legal' in link ? (
                                                    <button
                                                        type="button"
                                                        className="footer__link footer__link--button"
                                                        onClick={() => setActiveLegalDoc(link.legal)}
                                                    >
                                                        {link.label}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={link.href}
                                                        target={link.external ? '_blank' : undefined}
                                                        rel={link.external ? 'noreferrer' : undefined}
                                                        className="footer__link"
                                                    >
                                                        <span>{link.label}</span>
                                                        {link.external && <ArrowUpRight size={15} strokeWidth={1.9} />}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="footer__bottom" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                        <p className="footer__copy" style={{ maxWidth: '800px', lineHeight: '1.6' }}>
                            Software Factory especializada en desarrollo web, software personalizado, inteligencia artificial y automatización de procesos. <br />
                            Creamos tecnología que genera resultados. <br />
                            &copy; {new Date().getFullYear()} ECCOMFY. Argentina.
                        </p>

                        <button type="button" className="footer__top" onClick={handleBackToTop}>
                            <ArrowUp size={16} strokeWidth={2.1} />
                            Volver arriba
                        </button>
                    </div>
                </div>
            </footer>

            {activeDocument && createPortal(
                <div
                    className="legal-modal-backdrop"
                    role="presentation"
                    onMouseDown={() => setActiveLegalDoc(null)}
                >
                    <div
                        className="legal-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="legal-modal-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="legal-modal__top">
                            <div>
                                <span className="legal-modal__eyebrow">Información legal</span>
                                <h3 id="legal-modal-title">{activeDocument.title}</h3>
                            </div>

                            <button
                                type="button"
                                className="legal-modal__close"
                                aria-label="Cerrar documento legal"
                                onClick={() => setActiveLegalDoc(null)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="legal-modal__body">
                            <p className="legal-modal__intro">{activeDocument.intro}</p>
                            <p className="legal-modal__highlight">{activeDocument.highlight}</p>

                            <div className="legal-modal__sections">
                                {activeDocument.sections.map((section) => (
                                    <section key={section.heading} className="legal-modal__section">
                                        <h4>{section.heading}</h4>
                                        {section.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </section>
                                ))}
                            </div>

                            <div className="legal-modal__note">
                                <p>Referencias oficiales utilizadas para orientar este borrador:</p>
                                <div className="legal-modal__links">
                                    {LEGAL_REFERENCES.map((reference) => (
                                        <a
                                            key={reference.href}
                                            href={reference.href}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {reference.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};