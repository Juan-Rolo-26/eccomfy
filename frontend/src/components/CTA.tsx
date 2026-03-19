import { Sparkles } from 'lucide-react';

export const CTA = () => {
    return (
        <section id="contacto" className="cta-section container">
            <div className="cta-box">
                <h2>Únete a la nueva era del <span className="gradient-text">eCommerce</span></h2>
                <p>Crea tu cuenta hoy y descubre cómo eccomfy facilita tus ventas.</p>
                <button type="button" className="btn-large primary" style={{ margin: '0 auto' }}>
                    Crear Tienda Gratis <Sparkles size={20} />
                </button>
            </div>
        </section>
    );
};
