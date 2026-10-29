import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock data for project images
const projectGalleries: Record<string, { 
  title: string, 
  images: string[], 
  category: string, 
  description?: string,
  fullText?: string,
  year?: string,
  city?: string
}> = {
  // Moda Projects
  "emergentes-candelaria": {
    title: "Emergentes x Candelaria",
    description: "Modelo x Candelaria Romero",
    category: "Moda",
    year: "2023",
    city: "Córdoba",
    images: [
      "/fotos/IMG_4688.png",
      "/fotos/IMG_4594.png",
      "/fotos/IMG_4695.jpg",
      "/fotos/IMG_4730.png",
    ]
  },
  "emergentes-keko": {
    title: "Emergentes x Keko",
    description: "Modelo x Alejo Ruiz",
    category: "Moda",
    year: "2025",
    city: "Barcelona",
    images: [
      "/fotos/DSC_0227.jpg",
      "/fotos/DSC_0257.jpg",
      "/fotos/DSC_0226.jpg",
      "/fotos/DSC_0220.jpg",
      "/fotos/DSC_0224.jpg",
    ]
  },
  "escamas-diablo": {
    title: "Escamas del Diablo x Filipo",
    description: "Estilista y modelo x Felipe Perez\nAsistencia en produccion y estilismo x Sol Oviedo",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_0778.PORTADAP.jpg",
      "/fotos/DSC_0778.MARCA.jpg",
      "/fotos/DSC_0709.MARCA.jpg",
      "/fotos/DSC_0727.MARCA.jpg",
      "/fotos/DSC_0769.MARCA.jpg",
      "/fotos/DSC_0857.MARCA.jpg",
      "/fotos/DSC_0829.MARCA.jpg",
      "/fotos/DSC_0901.MARCA.jpg",
    ]
  },
  "polaroid-veronica": {
    title: "Emergentes x Veronica",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/20260318_213148710_iOS.jpg",
      "/fotos/DSC_0532.jpg",
      "/fotos/DSC_0525.jpg",
      "/fotos/DSC_0516.jpg",
      "/fotos/DSC_0606.jpg",
      "/fotos/DSC_0614.jpg",
      "/fotos/DSC_0575.jpg",
    ]
  },
  "saintsinners": {
    title: "Saintsinners c Mannequins Agencia",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_8825.jpg",
      "/fotos/DSC_8801-3.jpg",
      "/fotos/DSC_8814.jpg",
      "/fotos/DSC_8832.jpg",
      "/fotos/DSC_8853.jpg",
      "/fotos/DSC_8893.jpg",
      "/fotos/DSC_8692.jpg",
      "/fotos/DSC_8724.jpg",
    ]
  },
  "polaroid-lautaro": {
    title: "Polaroid x Lautaro",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5520.jpg",
      "/fotos/DSC_5565.jpg",
      "/fotos/DSC_5564.jpg",
      "/fotos/DSC_5545.jpg",
    ]
  },
  "emergentes-felipe-2": {
    title: "Emergentes x Felipe II",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5823-2.jpg",
      "/fotos/DSC_5693-2.jpg",
      "/fotos/DSC_5711-2.jpg",
      "/fotos/DSC_5802-2.jpg",
      "/fotos/DSC_5869-2.jpg",
    ]
  },
  "emergentes-felipe": {
    title: "Emergentes x Felipe",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5712-2.jpg",
      "/fotos/5693.jpg",
      "/fotos/5710.jpg",
      "/fotos/5712.jpg",
      "/fotos/5800.jpg",
      "/fotos/5823.jpg",
      "/fotos/5869.jpg",
    ]
  },
  "emergentes": {
    title: "Emergentes x Lautaro",
    category: "Moda",
    year: "2026",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5030.jpg",
      "/fotos/4916.jpg",
      "/fotos/4950.jpg",
      "/fotos/5030.jpg",
      "/fotos/5041.jpg",
      "/fotos/DSC_5041.jpg",
      "/fotos/DSC_5044.jpg",
    ]
  },

  // Autor Projects
  "queriendo-escapar": {
    title: "se me pasa la vida queriendo escapar",
    category: "Autor",
    images: [
      "/fotos/DSC_8774.jpg",
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const project = id ? projectGalleries[id] : null;

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project || project.images.length <= 1) return;
      if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight" || e.key === " ") {
        paginate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, currentIndex]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-[#1a1c1c] font-sans antialiased flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-light tracking-wide mb-4">Proyecto no encontrado</h2>
          <Link 
            to="/moda"
            className="text-xs uppercase tracking-widest text-[#777] hover:text-[#1a1c1c] underline underline-offset-4"
          >
            Volver a Moda
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = project.images.length - 1;
      if (nextIndex >= project.images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1c1c] font-sans antialiased">
      <Navbar />

      {/* Main Content - Strictly constrained to viewport height */}
      <main className="w-full h-[100dvh] bg-white pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-4 sm:pb-6 md:pb-8 px-3 md:px-6 flex flex-col justify-between items-center box-border overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="flex-shrink-0 text-center w-full flex flex-col justify-center pt-2 pb-1 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-2 cursor-default"
          >
            <h1 className="text-xs sm:text-base md:text-xl lg:text-2xl font-light tracking-wide inline-block select-none leading-normal uppercase break-words max-w-full">
              {project.title}
            </h1>
            {project.description && project.description.split('\n').map((line, i) => (
              <p 
                key={i}
                className="text-[9px] sm:text-[10px] md:text-xs tracking-widest text-editorial-muted lowercase mt-0.5 break-words max-w-md mx-auto leading-tight"
              >
                {line}
              </p>
            ))}
          </motion.div>
        </div>

        {/* 2. Image Section - Centered and fills remaining height cleanly */}
        <div className="flex-1 w-full min-h-0 relative flex items-center justify-center select-none group my-1">
          
          {/* Navigation Controls Overlayed on sides */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 flex items-center justify-center z-20 pointer-events-none">
            {project.images.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="p-1.5 text-black/20 hover:text-black transition-colors pointer-events-auto"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-10 lg:w-14" />
              </motion.button>
            )}
          </div>

          {/* Image container that is flex-1 min-h-0 so it keeps layout height within screen limits */}
          <div className="relative w-full h-full max-w-6xl flex items-center justify-center px-6 sm:px-10 md:px-14">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 }
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={project.images[currentIndex]} 
                  alt={`${project.title} - ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer select-none pointer-events-auto"
                  onClick={() => paginate(1)}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-y-0 right-0 w-8 md:w-16 flex items-center justify-center z-20 pointer-events-none">
            {project.images.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="p-1.5 text-black/20 hover:text-black transition-colors pointer-events-auto"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-10 lg:w-14" />
              </motion.button>
            )}
          </div>
        </div>

        {/* 3. Footer / Pagination Section */}
        <div className="flex-shrink-0 w-full flex flex-col items-center justify-center pt-1 pb-1 z-10 select-none">
          {project.images.length > 1 && (
            <div className="text-[9px] sm:text-[10px] md:text-xs tracking-widest text-[#777] mb-1 font-mono">
              {currentIndex + 1} / {project.images.length}
            </div>
          )}

          <div className="text-[8px] sm:text-[9px] md:text-[10px] tracking-widest text-[#999] uppercase flex items-center gap-2">
            {project.year && <span>{project.year}</span>}
            {project.year && project.city && <span>•</span>}
            {project.city && <span>{project.city}</span>}
          </div>
        </div>

      </main>
    </div>
  );
}
