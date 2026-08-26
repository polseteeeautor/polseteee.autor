/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Moda from "./pages/Moda";
import Autor from "./pages/Autor";
import ProjectDetail from "./pages/ProjectDetail";
import Consultas from "./pages/Consultas";
import TouchFeedback from "./components/TouchFeedback";

export default function App() {
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
