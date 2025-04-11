import React from 'react';


import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]">
            </div>

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">{heroDetails.heading}</h1>
                <p className="mt-4 text-foreground max-w-lg mx-auto">{heroDetails.subheading}</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
          
            </div>

            {/* Responsive Loom Video Embed */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-l mb-8">
            <iframe
                src="https://www.loom.com/embed/a50d59be802b4c2dbc059c656db8fa06?sid=5f4e6c35-1906-4c04-9b79-61a38a6c736b"
                allow="fullscreen"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                title="Job Tracker Demo"
            ></iframe>
            </div>
            </div>
        </section>
    );
};

export default Hero;


