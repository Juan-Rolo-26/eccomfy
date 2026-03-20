import { ReactNode } from 'react';

type StackingWrapperProps = {
    children: ReactNode;
    zIndex: number;
    overlayColor?: string;
    /**
     * Cuando sticky=true la sección queda fija (position: sticky)
     * y la siguiente sección (con zIndex mayor) sube y la tapa,
     * logrando el efecto de apilamiento / card-stack.
     */
    sticky?: boolean;
};

export const StackingWrapper = ({ children, zIndex, sticky = false }: StackingWrapperProps) => {
    if (sticky) {
        return (
            <div style={{ position: 'relative', zIndex }}>
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    {children}
                </div>
                {/* Espacio extra para que haya scroll antes de que la siguiente sección tape */}
                <div style={{ height: '60vh' }} aria-hidden="true" />
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', zIndex }}>
            {children}
        </div>
    );
};
