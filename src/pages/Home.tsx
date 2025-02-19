import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Chrome, Clipboard, Github, Linkedin } from 'lucide-react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
              Professional templates for every situation
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-xl mb-8">
              Craft perfect emails in seconds with our curated collection of professional templates. Available on web and soon as a Chrome extension.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="px-6 py-3 bg-white/10 text-white/50 border-2 border-white/20 inline-flex items-center gap-2 cursor-not-allowed"
              >
                <Chrome size={20} />
                Chrome Extension (Coming Soon)
              </button>
              <Link 
                to="/templates"
                className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Why ColdCraft?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border-2 border-black hover:translate-y-[-8px] transition-transform">
              <Mail className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
              <p className="text-black/60">
                Carefully crafted templates for every professional scenario, from job referrals to networking.
              </p>
            </div>
            <div className="p-8 border-2 border-black/20 hover:translate-y-[-8px] transition-transform">
              <Chrome className="w-8 h-8 mb-4 text-black/20" />
              <h3 className="text-xl font-semibold mb-3">Browser Extension</h3>
              <p className="text-black/60">
                Coming Soon: Access templates directly from your browser's side panel. No need to switch between tabs.
              </p>
            </div>
            <div className="p-8 border-2 border-black hover:translate-y-[-8px] transition-transform">
              <Clipboard className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold mb-3">One-Click Copy</h3>
              <p className="text-black/60">
                Copy subjects and messages with a single click. Customize placeholders to match your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6">
              <a 
                href="https://github.com/KreativeND"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://x.com/KreativeND"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="opacity-60 hover:opacity-100"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/niraj-dasari/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} ColdCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;