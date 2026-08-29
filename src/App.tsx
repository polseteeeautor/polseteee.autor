/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Moda from "./pages/Moda";
import Autor from "./pages/Autor";
import ProjectDetail from "./pages/ProjectDetail";
import Consultas from "./pages/Consultas";
import TouchFeedback from "./components/TouchFeedback";

export default function App() {
  // Protección global contra clic derecho, arrastrar y guardar imágenes
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.closest("img") || target.closest(".aspect-\\[3\\/4\\]"))) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.closest("img"))) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <Router>
      <main className="min-h-screen selection:bg-editorial-ink selection:text-white">
        <TouchFeedback />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moda" element={<Moda />} />
          <Route path="/moda/:projectId" element={<ProjectDetail />} />
          <Route path="/autor" element={<Autor />} />
          <Route path="/autor/:projectId" element={<ProjectDetail />} />
          <Route path="/consultas" element={<Consultas />} />
        </Routes>
      </main>
    </Router>
  );
}
