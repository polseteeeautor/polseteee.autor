import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const projects = [
  {
    id: "emergentes-keko",
    title: "Emergentes x Keko",
    image: "/fotos/DSC_0227.jpg"
  },
  {
    id: "escamas-diablo",
    title: "Escamas del Diablo x Filipo",
    image: "/fotos/DSC_0778.PORTADAP.jpg"
  },
  {
    id: "polaroid-veronica",
    title: "Emergentes x Veronica",
    image: "/fotos/20260318_213148710_iOS.jpg"
  },
  {
    id: "saintsinners",
    title: "Saintsinners c Mannequins Agencia",
    image: "/fotos/DSC_8825.jpg"
  },
  {
    id: "polaroid-lautaro",
    title: "Polaroid x Lautaro",
    image: "/fotos/DSC_5520.jpg"
  },
  {
    id: "emergentes-felipe-2",
    title: "Emergentes x Felipe II",
    image: "/fotos/DSC_5823-2.jpg"
  },
  {
    id: "emergentes-felipe",
    title: "Emergentes x Felipe",
    image: "/fotos/DSC_5712-2.jpg"
  },
  {
    id: "emergentes",
    title: "Emergentes x Lautaro",
    image: "/fotos/DSC_5030.jpg"
  }
];

export default function Moda() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased">
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 bg-stone-200 border border-stone-200"
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              to={`/moda/${typeof project.id === 'string' ? project.id : "m" + project.id}`}
              className="block"
            >
              <motion.div
                initial="hidden"
                whileHover="hoverState"
                whileTap="hoverState"
                whileInView="mobileVisible"
                viewport={{ once: false, amount: 0.6 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                animate="visible"
                transition={{ duration: 0.8 }}
                className="group relative aspect-[3/4] bg-white overflow-hidden cursor-pointer"
              >
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  variants={{
                    hidden: { scale: 1 },
                    visible: { scale: 1 },
                    hoverState: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Transparent overlay: hidden on mobile, hover fade-in on desktop */}
                <div className="absolute inset-0 bg-black/60 hidden md:flex items-center justify-center p-3 sm:p-4 md:p-6 text-center select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-sans text-white text-xs sm:text-sm md:text-xl lg:text-2xl px-2 sm:px-4 lowercase tracking-wide font-medium md:font-light leading-snug break-words max-w-full">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
