import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="w-full max-w-2xl mx-auto py-32 px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-20 text-center"
      >
        <motion.h2 
          className="text-3xl font-light tracking-tighter inline-block cursor-default select-none"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Consultas
        </motion.h2>
      </motion.div>

      <form className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="relative group">
            <label className="block text-micro uppercase tracking-editorial text-editorial-muted mb-1">
              Nombre
            </label>
            <input 
              type="text" 
              placeholder="Tu nombre completo"
              className="w-full bg-transparent border-0 border-b border-editorial-border py-3 focus:ring-0 focus:border-editorial-ink transition-colors duration-500 placeholder:text-stone-200 font-sans text-base outline-none"
            />
          </div>
          <div className="relative group">
            <label className="block text-micro uppercase tracking-editorial text-editorial-muted mb-1">
              Correo electrónico
            </label>
            <input 
              type="email" 
              placeholder="email@ejemplo.com"
              className="w-full bg-transparent border-0 border-b border-editorial-border py-3 focus:ring-0 focus:border-editorial-ink transition-colors duration-500 placeholder:text-stone-200 font-sans text-base outline-none"
            />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-micro uppercase tracking-editorial text-editorial-muted mb-1">
            Asunto
          </label>
          <input 
            type="text" 
            placeholder="Ej: Proyecto de Fotografía Editorial"
            className="w-full bg-transparent border-0 border-b border-editorial-border py-3 focus:ring-0 focus:border-editorial-ink transition-colors duration-500 placeholder:text-stone-200 font-sans text-base outline-none"
          />
        </div>

        <div className="relative group">
          <label className="block text-micro uppercase tracking-editorial text-editorial-muted mb-1">
            Mensaje
          </label>
          <textarea 
            rows={3}
            placeholder="Describe brevemente tu visión"
            className="w-full bg-transparent border-0 border-b border-editorial-border py-3 focus:ring-0 focus:border-editorial-ink transition-colors duration-500 placeholder:text-stone-200 font-sans text-base outline-none resize-none"
          />
        </div>

        <div className="flex justify-center pt-8">
          <button 
            type="submit"
            className="group flex items-center space-x-4 py-5 px-12 bg-editorial-ink text-white hover:bg-stone-800 transition-all duration-500 uppercase tracking-editorial text-micro"
          >
            <span>Enviar</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </section>
  );
}
