import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const projects = [
  {
    id: "queriendo-escapar",
    title: "se me pasa la vida queriendo escapar",
    image: "/fotos/DSC_8774.jpg"
  }
];

export default function Autor() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased">
      <Navbar />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 md:pt-40 pb-24 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 bg-stone-200 border border-stone-200">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/autor/${project.id}`}
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
                  className="w-full h-full object-cover grayscale select-none pointer-events-none"
                  draggable={false}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
