// Navbar.jsx
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icon lib

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide">SmartHelmet</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 text-lg">
          <li><a href="Home" className="hover:text-blue-400">Home</a></li>
          <li><a href="features" className="hover:text-blue-400">Features</a></li>
          <li><a href="About" className="hover:text-blue-400">About</a></li>
          <li><a href="Contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
