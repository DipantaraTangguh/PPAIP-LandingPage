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

/**
 * Molecule: ProdiStatCard
 * Displays a program studi name with a graduation cap icon and practitioner count badge.
 */
export function ProdiStatCard({ name, count, variant = 'orange' }) {
  const badgeColors = variant === 'orange'
    ? 'bg-[#C4571A] text-white'
    : 'bg-[#6B1B1B] text-white';

  const iconColors = variant === 'orange'
    ? 'text-[#C4571A]'
    : 'text-[#6B1B1B]';

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4">
        {/* Graduation Cap Icon */}
        <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${iconColors}`}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
          </svg>
        </div>

        {/* Program Name */}
        <span className="text-sm md:text-base font-medium text-gray-800">{name}</span>
      </div>

      {/* Count Badge */}
      <div className={`flex flex-col items-center justify-center rounded-lg px-4 py-2 min-w-[60px] ${badgeColors}`}>
        <span className="text-xl font-bold leading-tight">{count}</span>
        <span className="text-[10px] opacity-80">Praktisi</span>
      </div>
    </div>
  );
}

/**
 * Molecule: YearFilterPill
 * A single year pill button for filtering data.
 */
export function YearFilterPill({ year, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 ${
        isActive
          ? 'bg-[#4A1010] shadow-md'
          : 'bg-[#8B2525] hover:bg-[#6B1B1B]'
      }`}
    >
      {year}
    </button>
  );
}

/**
 * Molecule: DonutChart
 * A filled pie chart with KUB / Non-KUB slices and legend.
 */
export function DonutChart({ kub, nonKub }) {
  const total = kub + nonKub;
  const kubPct = Math.round((kub / total) * 100);
  const nonKubPct = 100 - kubPct;

  // SVG pie chart parameters
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  // Calculate pie slice angles (start from top, 12 o'clock = -90°)
  const nonKubAngle = (nonKubPct / 100) * 360;
  const toRad = (deg) => (deg * Math.PI) / 180;

  // Non-KUB slice: from 0° to nonKubAngle (starting at 12 o'clock)
  const startAngle = -90;
  const nonKubEnd = startAngle + nonKubAngle;
  const kubEnd = nonKubEnd + (kubPct / 100) * 360;

  // Arc helper: returns SVG arc path for a pie slice
  const describeArc = (startDeg, endDeg) => {
    const start = {
      x: cx + r * Math.cos(toRad(startDeg)),
      y: cy + r * Math.sin(toRad(startDeg)),
    };
    const end = {
      x: cx + r * Math.cos(toRad(endDeg)),
      y: cy + r * Math.sin(toRad(endDeg)),
    };
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  // Label position helper: place label in the middle of a slice
  const labelPos = (startDeg, endDeg, dist = 0.6) => {
    const midAngle = (startDeg + endDeg) / 2;
    return {
      x: cx + r * dist * Math.cos(toRad(midAngle)),
      y: cy + r * dist * Math.sin(toRad(midAngle)),
      angle: midAngle,
    };
  };

  const nonKubLabel = labelPos(startAngle, nonKubEnd, 0.55);
  const kubLabel = labelPos(nonKubEnd, kubEnd, 0.55);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Pie Chart SVG */}
        <div className="flex-shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* KUB slice (larger, deeper orange) */}
            <path
              d={describeArc(nonKubEnd, kubEnd)}
              fill="#E8952E"
              className="transition-all duration-700"
            />
            {/* Non-KUB slice (smaller, lighter orange) */}
            <path
              d={describeArc(startAngle, nonKubEnd)}
              fill="#F5C57A"
              className="transition-all duration-700"
            />
            {/* KUB label */}
            <text
              x={kubLabel.x}
              y={kubLabel.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="18"
              fontWeight="400"
              letterSpacing="1"
            >
              KUB
            </text>
            {/* Non-KUB label (rotated along the slice) */}
            <text
              x={nonKubLabel.x}
              y={nonKubLabel.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="13"
              fontWeight="400"
              letterSpacing="0.5"
              transform={`rotate(${nonKubLabel.angle + 90} ${nonKubLabel.x} ${nonKubLabel.y})`}
            >
              Non-KUB
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded bg-[#E8952E] flex-shrink-0" />
            <span className="text-base font-medium text-gray-700 w-24">KUB</span>
            <span className="text-xl font-bold text-gray-900">{kub}</span>
            <span className="text-[#2E7D32] font-semibold text-base ml-auto">{kubPct}%</span>
          </div>
          <div className="border-t border-gray-100" />
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 rounded bg-[#F5C57A] flex-shrink-0" />
            <span className="text-base font-medium text-gray-700 w-24">Non-KUB</span>
            <span className="text-xl font-bold text-gray-900">{nonKub}</span>
            <span className="text-[#2E7D32] font-semibold text-base ml-auto">{nonKubPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Molecule: InternshipProdiCard
 * A single program studi card with stacked horizontal bar and KUB/Non-KUB percentages.
 */
export function InternshipProdiCard({ name, kub, nonKub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-sm text-gray-800">{name}</span>
        <span className="text-gray-400 text-lg">›</span>
      </div>

      {/* Stacked bar */}
      <div className="w-full h-3 flex rounded-full overflow-hidden mb-3">
        <div className="bg-[#D4871C] transition-all duration-500" style={{ width: `${kub}%` }} />
        <div className="bg-[#2E7D32] transition-all duration-500" style={{ width: `${nonKub}%` }} />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#D4871C] rounded-sm" />
          <span className="font-medium text-gray-700">{kub} %</span>
          <span className="text-gray-400 ml-1">KUB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#2E7D32] rounded-sm" />
          <span className="font-medium text-gray-700">{nonKub} %</span>
          <span className="text-gray-400 ml-1">Non-KUB</span>
        </div>
      </div>
    </div>
  );
}
