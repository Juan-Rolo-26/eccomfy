import videoOne from '../assets/Video1.mp4';

export const VideoShowcase = () => {
    return (
        <section id="proyectos" className="video-showcase">
            <video
                className="video-showcase__media"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoOne} type="video/mp4" />
            </video>
        </section>
    );
};
