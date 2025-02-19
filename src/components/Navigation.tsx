import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">ColdCraft</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation