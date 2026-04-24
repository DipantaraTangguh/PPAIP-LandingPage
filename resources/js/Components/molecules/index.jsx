import React from 'react';
import { ChevronIcon } from '../atoms';

/**
 * Molecule: ProgramCard
 * A single program card with image, decorative corners, title, and details link.
 */
export function ProgramCard({ name, image, link }) {
  return (
    <a href={link} className="group flex-shrink-0 px-3 block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        {/* Image with decorative corners */}
        <div className="relative mx-4 mt-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[28px] border-t-[#1B6B5B] border-r-[28px] border-r-transparent" />
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-t-[#1B6B5B] border-l-[28px] border-l-transparent" />
        </div>

        {/* Footer */}
        <div className="px-4 py-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500 group-hover:text-[#C4571A] transition-colors duration-200 flex items-center gap-1">
            Details <span className="text-lg">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

/**
 * Molecule: FaqItem
 * A single expandable FAQ accordion item.
 */
export function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-sm md:text-base text-gray-700 font-medium">
          {question}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
