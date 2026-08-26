import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Moda", path: "/moda" },
    { name: "Autor", path: "/autor" },
    { name: "Consultas", path: "/consultas" },
  ];

  const isProjectDetail = location.pathname.includes("/moda/") || location.pathname.includes("/autor/");
  const backPath = location.pathname.includes("/moda/") ? "/moda" : "/autor";
  const backLabel = location.pathname.includes("/moda/") ? "Volver a Moda" : "Volver a Autor";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-3 sm:px-6 md:px-12 py-3 sm:py-4 md:py-5 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Link to="/" className="inline-block flex-shrink-0 whitespace-nowrap">
              <motion.span 
                className="text-xs sm:text-base md:text-xl font-light tracking-tighter text-black block cursor-default select-none origin-left whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                polseteee .autor
              </motion.span>
            </Link>

            {isProjectDetail && (
              <div className="flex items-center pl-2 sm:pl-3 border-l border-stone-200 min-w-0">
                <Link 
                  to={backPath}
                  className="text-[10px] sm:text-xs md:text-sm text-stone-600 hover:text-black transition-colors whitespace-nowrap lowercase font-normal"
                >
                  {backLabel.toLowerCase()}
                </Link>
              </div>
            )}
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-micro tracking-editorial uppercase transition-colors duration-500 ${
                  location.pathname.startsWith(link.path) && location.pathname.length <= link.path.length + 1
                    ? "text-black border-b border-black pb-1" 
                    : "text-editorial-muted hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black p-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-10 md:hidden px-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.15, duration: 0.6 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-light tracking-tighter transition-colors duration-500 ${
                    location.pathname === link.path ? "text-black underline underline-offset-8" : "text-editorial-muted hover:text-black"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
