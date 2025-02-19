import React from 'react';
import { Chrome, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Extension() {
  return (
    <div className="pt-24">
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Chrome Extension</h2>
              <p className="text-lg text-black/60 mb-8">
                Access ColdCraft templates directly from your browser's side panel. No more switching between tabs when you need to craft the perfect email.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://chrome.google.com/webstore/detail/your-extension-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border-2 border-black inline-flex items-center gap-2"
                >
                  <Chrome size={20} />
                  Add to Chrome
                </a>
                <Link 
                  to="/templates"
                  className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white"
                >
                  Try Web Version
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border-2 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2070"
                  alt="Chrome Extension Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6">
                <Sparkles className="w-12 h-12 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Extension;