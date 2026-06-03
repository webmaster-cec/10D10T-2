import { motion } from 'framer-motion';
import { Globe, Phone, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import UiloraVectorGrid from './Backgrounds/UiloraVectorGrid';
import ieeeLogo from '../assets/images/SB-logo30.png';
import rasLogo from '../assets/images/RAS-white.png';

const InstagramIcon = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IIBar = ({ reverse, className = '' }) => (
  <span
    className={`inline-block shrink-0 ${className}`}
    style={{
      clipPath: reverse
        ? 'polygon(100% 0, 100% 100%, 0 100%, 0 15%)'
        : 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)',
      background: 'linear-gradient(to bottom, #ffffff, #cfcfcf, #7a7a7a)',
      width: '0.18em',
      height: '0.73em',
      opacity: 1,
    }}
  />
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon size={18} />, href: 'https://www.instagram.com/ieee_sb_cec/' },
    { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/company/ieee-sb-cec/' },
    { name: 'Website', icon: <Globe size={18} />, href: 'https://ieeesbcec.org' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tasks', href: '#tasks' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Rules', href: '#rules' },
    { name: 'Organizers', href: '#organizers' },
  ];

  const contactInfo = [
    { name: 'Parvathy Vinayan', phone: '+91 7034742769' },
    { name: 'Jotham K Philip', phone: '+91 79075 81263' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer id="footer" className="relative bg-[#020202] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/10 cursor-default">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none hidden md:block">
        <UiloraVectorGrid gridSize={60} />
      </div>

      {/* Radial Gradient overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-16 mb-12 md:mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-title text-5xl tracking-widest text-white flex items-baseline">
                <span>10D</span>
                <span className="grayscale ml-2">10T</span>
                <div className="flex gap-[0.15em] items-baseline ml-3">
                  <IIBar reverse={true} />
                  <IIBar reverse={false} />
                </div>
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-white/20" />
                <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-bold">10 Days 10 Tasks</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-light tracking-wide">
              Level up your skills with a 10-day challenge that pushes you to think, create, and innovate.
              The ultimate competition by IEEE SB CEC.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: "white" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center text-white/40 hover:text-black transition-colors bg-white/5"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="col-span-1 space-y-6 md:space-y-8">
            <h3 className="font-heading text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white/50 border-l-2 border-white/20 pl-3 md:pl-4">Navigation</h3>
            <ul className="flex flex-col gap-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="group relative flex items-center text-sm text-white/40 hover:text-white transition-colors duration-300 w-fit"
                    whileHover="hover"
                    initial="initial"
                  >
                    <span className="relative overflow-hidden tracking-wider">
                      <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-white font-medium">
                        {link.name}
                      </span>
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-white/40 to-transparent"
                      variants={{
                        initial: { width: 0 },
                        hover: { width: '100%' }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="col-span-1 space-y-6 md:space-y-8">
            <h3 className="font-heading text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white/80 border-l-2 border-white/20 pl-3 md:pl-4">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((contact) => (
                <div key={contact.name} className="group">
                  <span className="text-[9px] md:text-[10px] text-white/30 group-hover:text-white uppercase font-bold tracking-widest block mb-1">{contact.name}</span>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-xs md:text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white transition-colors shrink-0">
                      <Phone size={12} className="text-white group-hover:text-black" />
                    </div>
                    <span className="whitespace-nowrap">{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Location & Organization Column */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 space-y-6 md:space-y-8">
            <h3 className="font-heading text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white/80 border-l-2 border-white/20 pl-3 md:pl-4">Location</h3>
            <div className="space-y-6">
              <div className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white transition-colors flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-white group-hover:text-black" />
                </div>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white transition-colors">
                  College of Engineering Chengannur,<br />Alappuzha, Kerala - 689121
                </p>
              </div>

              <div className="pt-6 mt-4 md:mt-0 flex gap-6 md:flex-col items-center md:items-start border-t border-white/5 md:border-none justify-center md:justify-start">
                <img src={ieeeLogo} alt="IEEE SB CEC" className="h-7 md:h-8 object-contain w-fit md:pl-2 hover:opacity-80 transition-opacity duration-500" />
                <img src={rasLogo} alt="IEEE RAS" className="h-9 md:h-10 object-contain w-fit md:pl-4 hover:opacity-80 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p className="text-[10px] text-white/30 tracking-widest uppercase font-medium">
              © {currentYear} <span className="text-white">10D10T</span>. ALL RIGHTS RESERVED.
            </p>
            <span className="hidden md:block h-1 w-1 rounded-full bg-white/10" />
            <a href="https://ieeesbcec.org" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest font-medium flex items-center gap-1">
              IEEE SB CEC <ExternalLink size={10} />
            </a>
          </div>

          <div className="order-first md:order-last">
            <p className="text-[10px] text-white/20 tracking-widest uppercase font-bold">
              Crafted with <span className="text-red-500/50 group-hover:text-red-500 transition-colors animate-pulse">❤️</span> by <span className="text-white/40 hover:text-white transition-colors cursor-help border-b border-white/10 border-dotted">WebTeam IEEE SB CEC</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;






