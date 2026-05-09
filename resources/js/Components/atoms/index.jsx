import React from 'react';

/**
 * Atom: NavLink
 * A single navigation link with hover effects for the navbar.
 */
export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 transition-all duration-300"
    >
      {children}
    </a>
  );
}

/**
 * Atom: CarouselDot
 * A clickable pagination dot for carousels.
 */
export function CarouselDot({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
        isActive ? 'bg-[#6B1B1B] scale-110' : 'bg-gray-300 hover:bg-gray-400'
      }`}
      aria-label="Go to slide"
    />
  );
}

/**
 * Atom: ChevronIcon
 * An animated chevron/arrow icon for accordions.
 */
export function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`w-5 h-5 text-[#6B1B1B] flex-shrink-0 ml-4 transition-transform duration-300 ${
        isOpen ? 'rotate-180' : ''
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Atom: SectionWrapper
 * Consistent max-width container used across all sections.
 */
export function SectionWrapper({ children, className = '' }) {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
