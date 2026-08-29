import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Hero() {
  const navItems = [
    { label: "Moda", path: "/moda" },
    { label: "Autor", path: "/autor" },
    { label: "Consultas", path: "/consultas" },
  ];

  return (
    <section className="flex-1 min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative">
      <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 relative z-10">
        {/* Action Buttons ABOVE title */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-8 relative z-20"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="group relative inline-flex flex-col items-center py-2 px-2.5 sm:py-3 sm:px-4 cursor-pointer select-none text-[9px] sm:text-micro tracking-[0.25em] sm:tracking-editorial uppercase text-editorial-muted hover:text-editorial-ink transition-colors duration-300 font-medium active:scale-95 touch-manipulation"
            >
              <span className="block transition-transform duration-300 group-hover:scale-105">
                {item.label}
              </span>
              <span className="absolute bottom-1 sm:bottom-1.5 left-2 sm:left-3 right-2 sm:right-3 h-[1px] bg-editorial-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center pointer-events-none" />
            </Link>
          ))}
        </motion.div>

        {/* Title BELOW action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="cursor-default select-none"
        >
          <motion.h1 
            className="text-[clamp(2.35rem,10.5vw,8rem)] font-light leading-none tracking-tighter text-editorial-ink inline-block px-2 sm:px-4 whitespace-nowrap max-w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            polseteee .autor
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
