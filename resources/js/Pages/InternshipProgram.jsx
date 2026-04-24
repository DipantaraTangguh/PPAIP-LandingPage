import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ============================================================
// DUMMY DATA
// ============================================================
const DUMMY_DATA = {
  "2024": {
    summary: { kub: 120, nonKub: 40 },
    prodi: [
      { id: 1, name: "Sistem Informasi", kub: 65, nonKub: 35 },
      { id: 2, name: "Teknik Elektro", kub: 55, nonKub: 45 },
      { id: 3, name: "Manajemen", kub: 75, nonKub: 25 },
      { id: 4, name: "Akuntansi", kub: 65, nonKub: 35 },
      { id: 5, name: "Ilmu Komunikasi", kub: 85, nonKub: 15 },
      { id: 6, name: "Teknik Industri", kub: 55, nonKub: 45 },
      { id: 7, name: "Desain Produk", kub: 65, nonKub: 35 },
      { id: 8, name: "Hubungan Internasional", kub: 55, nonKub: 45 },
      { id: 9, name: "Ekonomi Pembangunan", kub: 85, nonKub: 15 },
      { id: 10, name: "Teknik Sipil", kub: 55, nonKub: 45 },
    ]
  },
  "2025": {
    summary: { kub: 145, nonKub: 55 },
    prodi: [
      { id: 1, name: "Sistem Informasi", kub: 70, nonKub: 30 },
      { id: 2, name: "Teknik Elektro", kub: 60, nonKub: 40 },
      { id: 3, name: "Manajemen", kub: 80, nonKub: 20 },
      { id: 4, name: "Akuntansi", kub: 72, nonKub: 28 },
      { id: 5, name: "Ilmu Komunikasi", kub: 78, nonKub: 22 },
      { id: 6, name: "Teknik Industri", kub: 62, nonKub: 38 },
      { id: 7, name: "Desain Produk", kub: 68, nonKub: 32 },
      { id: 8, name: "Hubungan Internasional", kub: 58, nonKub: 42 },
      { id: 9, name: "Ekonomi Pembangunan", kub: 88, nonKub: 12 },
      { id: 10, name: "Teknik Sipil", kub: 60, nonKub: 40 },
    ]
  },
  "2026": {
    summary: { kub: 160, nonKub: 60 },
    prodi: [
      { id: 1, name: "Sistem Informasi", kub: 75, nonKub: 25 },
      { id: 2, name: "Teknik Elektro", kub: 65, nonKub: 35 },
      { id: 3, name: "Manajemen", kub: 82, nonKub: 18 },
      { id: 4, name: "Akuntansi", kub: 74, nonKub: 26 },
      { id: 5, name: "Ilmu Komunikasi", kub: 80, nonKub: 20 },
      { id: 6, name: "Teknik Industri", kub: 66, nonKub: 34 },
      { id: 7, name: "Desain Produk", kub: 71, nonKub: 29 },
      { id: 8, name: "Hubungan Internasional", kub: 62, nonKub: 38 },
      { id: 9, name: "Ekonomi Pembangunan", kub: 90, nonKub: 10 },
      { id: 10, name: "Teknik Sipil", kub: 63, nonKub: 37 },
    ]
  }
}

// ============================================================
// CUSTOM LABEL FOR DONUT
// ============================================================
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {name}
    </text>
  )
}

// ============================================================
// 1. NAVBAR
// ============================================================
function Navbar() {
  return (
    <nav className="bg-[#6B1B1B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-stretch justify-between min-h-[56px]">
        {/* Logo */}
        <div className="flex items-center py-3">
          <img src="/assets/logo-bakrie.png" alt="Universitas Bakrie Logo" className="h-10 w-auto" />
        </div>

        {/* Nav Links */}
        <div className="flex items-stretch gap-1">
          <a href="/" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">Home</a>
          <a href="#" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">Menu</a>
          <a href="#" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">About Us</a>
        </div>
      </div>
    </nav>
  )
}

// ============================================================
// 2. HERO BANNER
// ============================================================
function HeroBanner() {
  return (
    <div className="relative h-44 bg-[#7A2020] overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/assets/bakrie-banner.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#7A2020]/60 to-[#7A2020]/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-white">Internship Program</h1>
        <p className="text-sm text-white/80 mt-1">Persentase sebaran tempat mahasiswa magang</p>
      </div>
    </div>
  )
}

// ============================================================
// 3. YEAR FILTER
// ============================================================
function YearFilter({ years, activeYear, onYearChange }) {
  return (
    <div className="flex flex-row gap-2 px-4 pt-4">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 ${
            year === activeYear
              ? 'bg-[#4A1010] shadow-md'
              : 'bg-[#8B2525] hover:bg-[#6B1B1B]'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

// ============================================================
// 4. DONUT SUMMARY CARD
// ============================================================
function DonutSummaryCard({ kub, nonKub }) {
  const total = kub + nonKub
  const kubPct = Math.round((kub / total) * 100)
  const nonKubPct = 100 - kubPct

  const chartData = [
    { name: "KUB", value: kub },
    { name: "Non-KUB", value: nonKub },
  ]
  const COLORS = ["#F5A623", "#E8861A"]

  return (
    <div className="mx-4 mt-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-row items-center gap-4">
        {/* LEFT — Donut Chart */}
        <div className="w-[200px] h-[200px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT — Legend */}
        <div className="flex-1 min-w-0">
          {/* KUB row */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#F5A623] flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">KUB</span>
            <span className="text-lg font-bold text-gray-900 ml-auto">{kub}</span>
            <span className="text-green-600 font-semibold text-sm w-12 text-right">{kubPct}%</span>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-gray-200" />

          {/* Non-KUB row */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#E8861A] flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">Non-KUB</span>
            <span className="text-lg font-bold text-gray-900 ml-auto">{nonKub}</span>
            <span className="text-green-600 font-semibold text-sm w-12 text-right">{nonKubPct}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 5. PRODI STAT CARD
// ============================================================
function ProdiStatCard({ name, kub, nonKub, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm text-gray-800">{name}</span>
        <span className="text-gray-400 text-lg">›</span>
      </div>

      {/* Stacked bar */}
      <div className="mt-2 mb-3 w-full h-3 flex rounded-full overflow-hidden">
        <div className="bg-[#F5A623]" style={{ width: `${kub}%` }} />
        <div className="bg-[#2E7D32]" style={{ width: `${nonKub}%` }} />
      </div>

      {/* Stats footer */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#F5A623] rounded-sm" />
          <span className="font-medium text-gray-700">{kub} %</span>
          <span className="text-gray-400 ml-1">KUB</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#2E7D32] rounded-sm" />
          <span className="font-medium text-gray-700">{nonKub} %</span>
          <span className="text-gray-400 ml-1">Non-KUB</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 6. PRODI STATS GRID
// ============================================================
function ProdiStatsGrid({ prodiList }) {
  return (
    <div>
      <h2 className="text-xl font-bold px-4 mt-6 mb-3 text-gray-900">
        Statistik Tiap Program Studi
      </h2>
      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {prodiList.map((prodi) => (
          <ProdiStatCard
            key={prodi.id}
            name={prodi.name}
            kub={prodi.kub}
            nonKub={prodi.nonKub}
            onClick={() => console.log(`Navigate to detail: ${prodi.name}`)}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 7. ROOT PAGE COMPONENT
// ============================================================
export default function InternshipProgramPage() {
  const [activeYear, setActiveYear] = useState("2024")
  const currentData = DUMMY_DATA[activeYear]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <HeroBanner />
      <YearFilter
        years={["2024", "2025", "2026"]}
        activeYear={activeYear}
        onYearChange={setActiveYear}
      />
      <DonutSummaryCard
        key={activeYear}
        kub={currentData.summary.kub}
        nonKub={currentData.summary.nonKub}
      />
      <ProdiStatsGrid key={activeYear + "-grid"} prodiList={currentData.prodi} />
    </div>
  )
}
