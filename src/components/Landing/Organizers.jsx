import React from 'react';
import ieeeLogo from '../../assets/images/SB-logo30.png';
import rasLogo from '../../assets/images/RAS-white.png';

const Organizers = () => {
  const organizers = [
    { name: "IEEE SB CEC", logo: ieeeLogo },
    { name: "IEEE RAS SBC CEC", logo: rasLogo }
  ];

  return (
    <section id="organizers" className="relative z-20 py-16 px-6 bg-black border-t border-white/5">
      <div className="max-w-[1200px] mx-auto text-center w-full">
        <h2 className="text-3xl md:text-[100px] font-title uppercase tracking-widest leading-normal py-2 flex md:flex-row items-center justify-center gap-x-6 gap-y-2">
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Organised
          </span>
          <span style={{ WebkitTextStroke: '1px #ffffff', color: 'transparent' }}>
            by
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-32 items-center mt-12 mb-8">
          {organizers.map((org, index) => (
            <div key={index} className="group relative flex items-center justify-center p-8 transition-all duration-700">

              <div className="absolute inset-2 border-t-2 border-l-2 border-white rounded-tl-[30px] opacity-0 -translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 delay-100" />
              <div className="absolute inset-2 border-b-2 border-r-2 border-white rounded-br-[30px] opacity-0 translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 delay-100" />

              <img
                src={org.logo}
                alt={org.name}
                className="h-10 md:h-16 w-auto object-contain relative z-10 transition-all duration-700 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organizers;
