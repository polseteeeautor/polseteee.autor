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
      "/fotos/20260318_212103340_iOS.jpg",
    ]
  },
  "saintsinners": {
    title: "Saintsinners c Mannequins Agencia",
    description: "Modelos x Luciano Fiorotto - Julieta Acevedo - Giuliana Carpegna\nEstilista x Paula Weimann\nMaquillaje y asistencia en produccion y estilismo x Paula Garcia\nAgencia y organizacion x Mannequins Agencia - Natalia Bula - Isis Conci - Paula Weimann",
    category: "Moda",
    year: "2025",
    city: "Córdoba",
    images: [
      "/fotos/DSC_8825.jpg",
      "/fotos/DSC_8853.jpg",
      "/fotos/DSC_8893.jpg",
      "/fotos/DSC_8801-3.jpg",
      "/fotos/DSC_8814.jpg",
      "/fotos/DSC_8832.jpg",
    ]
  },
  "polaroid-lautaro": {
    title: "Polaroid x Lautaro",
    category: "Moda",
    year: "2025",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5520.jpg",
      "/fotos/DSC_5565.jpg",
      "/fotos/DSC_5545.jpg",
      "/fotos/DSC_5564.jpg",
    ]
  },
  "emergentes-felipe-2": {
    title: "Emergentes x Felipe II",
    description: "Modelo x Felipe Perez",
    category: "Moda",
    year: "2025",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5823-2.jpg",
      "/fotos/DSC_5869-2.jpg",
      "/fotos/DSC_5802-2.jpg",
    ]
  },
  "emergentes-felipe": {
    title: "Emergentes x Felipe",
    description: "Modelo x Felipe Perez",
    category: "Moda",
    year: "2025",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5712-2.jpg",
      "/fotos/DSC_5693-2.jpg",
      "/fotos/DSC_5711-2.jpg",
    ]
  },
  "emergentes": {
    title: "Emergentes x Lautaro",
    description: "Modelo x Lautaro Caceres",
    category: "Moda",
    year: "2025",
    city: "Córdoba",
    images: [
      "/fotos/DSC_5030.jpg",
      "/fotos/4916.jpg",
      "/fotos/DSC_5041.jpg",
      "/fotos/4950.jpg",
      "/fotos/DSC_5044.jpg",
    ]
  },
  "queriendo-escapar": {
    title: "me paso la vida queriendo escapar",
    category: "Autor",
    year: "2024",
    city: "Córdoba",
    fullText: `Agradezco a quienes se atrevan a dedicarle el tiempo necesario para dejar que la obra los habite y los cuestione.

«Se me pasa la vida queriendo escapar» surge de una visión del mundo donde el drama y el romance no son elementos aislados, sino una aleación densa y, a menudo, insoportable. Capaces de romper con la singularidad y cargar de una melancolía que pesa en el cuerpo. Es ese enfrentamiento constante el que construye pensamientos igual de indeseados a los momentos que nos obligan a descifrar la verdad sobre las cosas. Busco que la ansiedad y el miedo que conviven en estas sombras se transfieran al organismo de quien observa, transformando la narrativa visual en una reflexión física sobre sus propias decisiones, sus propias ruinas y sus propios intentos de fuga. Necesitamos salir.`,
    images: [
      "/fotos/DSC_8774.jpg",
      "/fotos/DSC_8692.jpg",
      "/fotos/DSC_8724.jpg",
    ]
  }
};

const swipeConfidenceThreshold = 800;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectId ? projectGalleries[projectId] : null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-editorial-muted">Proyecto no encontrado</p>
        <Link to="/" className="ml-4 underline">Volver al inicio</Link>
      </div>
    );
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = project.images.length - 1;
      if (next >= project.images.length) next = 0;
      return next;
    });
  };

  const backPath = project.category === "Moda" ? "/moda" : "/autor";
  const backLabel = `Volver a ${project.category}`;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
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
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold || offset.x < -35) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold || offset.x > 35) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center p-0 md:p-1 touch-pan-y"
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

        {/* 3. Footer Section - Always visible at bottom of first screen */}
        <div className="flex-shrink-0 text-center flex flex-col items-center h-auto pb-2 sm:pb-3">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center cursor-default"
          >
            {(project.year || project.city) && (
              <div className="text-[9px] sm:text-[10px] md:text-xs tracking-widest text-[#1a1c1c] uppercase mb-0.5">
                {project.year}{project.year && project.city && ', '}{project.city}
              </div>
            )}
            <div className="text-[9px] sm:text-[10px] md:text-xs tracking-widest text-editorial-muted uppercase leading-none font-medium">
              {currentIndex + 1} / {project.images.length}
            </div>
          </motion.div>
        </div>
      </main>

      {/* 4. Written Piece Section */}
      {project.fullText && (
        <>
          <section id="texto-obra" className="w-full py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-xl mx-auto">
              <div className="font-serif text-stone-900 text-xs sm:text-sm leading-relaxed space-y-4 text-left sm:text-justify font-medium whitespace-pre-line tracking-tight px-2 sm:px-6 select-text lowercase">
                {project.fullText}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
