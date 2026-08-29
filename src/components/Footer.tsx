import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="flex items-center justify-center px-6 py-10 w-full max-w-screen-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center gap-3 text-[9px] sm:text-micro tracking-[0.25em] sm:tracking-editorial uppercase text-editorial-muted">
          <span>© 2026 polseteee .autor</span>
          <a
            href="https://www.instagram.com/polseteee.autor?igsi=NzJ6c2VyM2RkMTlv&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de polseteee.autor"
            className="inline-flex items-center text-editorial-muted hover:text-editorial-ink transition-colors duration-200"
          >
            <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.5] -mt-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

