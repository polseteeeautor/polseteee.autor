import { motion } from "motion/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Consultas() {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorDetails("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/polseteee.autor@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Contacto: formData.contact,
          Mensaje: formData.message,
          _subject: `Nueva consulta de ${formData.name}`,
          _template: "table",
          _captcha: "false"
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        setStatus("success");
        setResponseMsg("¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.");
        setFormData({ name: "", contact: "", message: "" });
      } else {
        setStatus("error");
        setResponseMsg(data.message || "No se pudo enviar el mensaje.");
        setErrorDetails(data.message || "");
      }
    } catch (error: any) {
      setStatus("error");
      setResponseMsg("Error al enviar la consulta");
      setErrorDetails(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased">
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-screen-md mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-light tracking-tighter mb-4 inline-block cursor-default select-none"
            whileHover={{ scale: 1.02 }}
          >
            Consultas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-micro tracking-editorial uppercase text-editorial-muted"
          >
            Hablemos de tu próximo proyecto
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-12 border border-stone-100 shadow-sm"
        >
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center py-12"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
              <h2 className="text-2xl font-light mb-4">Mensaje Enviado</h2>
              <p className="text-editorial-muted mb-8">{responseMsg}</p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-micro tracking-editorial uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-all"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-micro tracking-editorial uppercase text-editorial-muted block">Nombre</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black outline-none transition-colors font-light"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-2">
                <label className="text-micro tracking-editorial uppercase text-editorial-muted block">Mail o Teléfono</label>
                <input 
                  required
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black outline-none transition-colors font-light"
                  placeholder="Tu mail o un número de contacto"
                />
              </div>

              <div className="space-y-2">
                <label className="text-micro tracking-editorial uppercase text-editorial-muted block">Mensaje</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black outline-none transition-colors font-light resize-none"
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col space-y-2 text-red-500 text-sm bg-red-50 p-4 border border-red-100"
                >
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{responseMsg}</span>
                  </div>
                  {errorDetails && (
                    <div className="ml-6 space-y-2">
                      <p className="text-xs opacity-80 font-mono break-words bg-white/50 p-2 rounded">
                        Detalle: {errorDetails}
                      </p>
                      <a 
                        href={`mailto:polseteee.autor@gmail.com?subject=Consulta de ${encodeURIComponent(formData.name || "Visitante")}&body=${encodeURIComponent(`Nombre: ${formData.name}\nContacto: ${formData.contact}\n\nMensaje:\n${formData.message}`)}`}
                        className="inline-block mt-2 text-xs uppercase tracking-wider bg-black text-white px-4 py-2 hover:bg-stone-800 transition-colors"
                      >
                        Enviar directamente por tu app de correo ↗
                      </a>
                    </div>
                  )}
                </motion.div>
              )}

              <motion.button 
                whileHover={{ backgroundColor: "#000", color: "#fff", scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "loading"}
                type="submit"
                className="w-full flex items-center justify-center space-x-3 text-micro tracking-editorial uppercase border border-black py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <motion.span layout>
                  {status === "loading" ? "Enviando..." : "Enviar Consulta"}
                </motion.span>
                <Send className={`w-3 h-3 transition-transform group-hover:translate-x-1 ${status === "loading" ? "animate-pulse" : ""}`} />
              </motion.button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}
