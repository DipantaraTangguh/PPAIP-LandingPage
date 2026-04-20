import React from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
  return (
    <>
      <Head title="Universitas Bakrie - Experience The Real Things" />

      <div className="min-h-screen bg-white font-sans antialiased">

        {/* ===== NAVBAR ===== */}
        <nav className="bg-[#6B1B1B]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-stretch justify-between min-h-[72px]">
            {/* Logo */}
            <div className="flex items-center py-4">
              <img src="/assets/logo-bakrie.png" alt="Universitas Bakrie Logo" className="h-10 w-auto" />
            </div>

            {/* Nav Links */}
            <div className="flex items-stretch gap-1">
              <a href="#" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">Home</a>
              <a href="#" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">Menu</a>
              <a href="#" className="flex items-center px-5 text-white text-base font-medium hover:text-yellow-300 hover:bg-black/20 hover:[text-shadow:0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-300">About Us</a>
            </div>
          </div>
        </nav>

        {/* ===== HERO SECTION ===== */}
        <section className="relative bg-gradient-to-br from-[#D6E8F5] via-[#E0EDF7] to-[#C8DDF0] overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#C4571A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6B1B1B]/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Content */}
            <div className="flex-1 z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#6B1B1B] leading-[1.05] tracking-tight">
                Experience
                <br />
                <span className="bg-gradient-to-r from-[#6B1B1B] to-[#A02B2B] bg-clip-text text-transparent">The Real Things</span>
              </h1>
              <p className="mt-5 text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
                Globally recognized university through engagement with industries and experiential learning methods
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="px-6 py-3 bg-[#F28F2F] text-white text-sm font-semibold rounded-full hover:bg-[#D97924] transition-all duration-300 shadow-lg shadow-[#F28F2F]/30 hover:shadow-xl hover:shadow-[#F28F2F]/40 hover:-translate-y-0.5"
                >
                  More about us
                </a>
                <a
                  href="#"
                  className="px-6 py-3 bg-[#6B1B1B] text-white text-sm font-semibold rounded-full hover:bg-[#4A1111] transition-all duration-300 shadow-lg shadow-[#6B1B1B]/20 hover:shadow-xl hover:shadow-[#6B1B1B]/40 hover:-translate-y-0.5"
                >
                  Join us today
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/30 aspect-video">
                <img src="/assets/bakrie-banner.jpg" alt="Universitas Bakrie" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== EXPERIENTIAL LEARNING SECTION ===== */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Experiential Learning
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 bg-[#C4571A] rounded-full"></div>
            <p className="mt-5 text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              We engage our students in experiential learning guided by professionals who are highly experienced in their respective fields
            </p>
          </div>
        </section>

        {/* ===== INTERNSHIP PROGRAM CARD ===== */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-[#6B1B1B] rounded-3xl overflow-hidden shadow-2xl shadow-[#6B1B1B]/20">
              <div className="flex flex-col md:flex-row">
                {/* Left Image */}
                <div className="md:w-2/5 p-5 md:p-6">
                  <img src="/assets/internship-program.png" className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                </div>

                {/* Right Content */}
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-[#E8A020] text-xs font-semibold tracking-[0.15em] uppercase">Program Unggulan</span>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">
                    Internship Program
                  </h3>
                  <div className="mt-3 w-12 h-1 bg-white rounded-full"></div>
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    Program magang mahasiswa Universitas Bakrie didukung penuh oleh industri Kelompok Usaha Bakrie (KUB) maupun industri Non-KUB yang bermitra
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block px-6 py-2.5 bg-white text-[#C4571A] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Lihat di sini
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRAKTISI MENGAJAR SECTION ===== */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-[#1B3A4B] rounded-3xl overflow-hidden shadow-2xl shadow-[#1B3A4B]/30">
              <div className="flex flex-col md:flex-row-reverse">
                {/* Image */}
                <div className="md:w-2/5 p-5 md:p-6">
                  <img src="/assets/praktisi-mengajar.png" className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Praktisi Mengajar
                  </h3>
                  <div className="mt-3 w-12 h-1 bg-white rounded-full"></div>
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    Program kolaborasi antara praktisi profesional dan dosen untuk memberikan pengalaman belajar yang relevan dengan kebutuhan industri.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block px-6 py-2.5 bg-white text-[#C4571A] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Lihat di sini
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PEMBELAJARAN DI LUAR PROGRAM STUDI CARD ===== */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-[#E8A020] rounded-3xl overflow-hidden shadow-2xl shadow-[#E8A020]/20">
              <div className="flex flex-col md:flex-row">
                {/* Left Image */}
                <div className="md:w-2/5 p-5 md:p-6">
                  <img src="/assets/internship-mandiri.png" className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                </div>

                {/* Right Content */}
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Pembelajaran di Luar
                    <br />
                    Program Studi
                  </h3>
                  <div className="mt-3 w-12 h-1 bg-white rounded-full"></div>
                  <p className="mt-4 text-white/85 text-sm leading-relaxed">
                    Universitas Bakrie aktif menerapkan program Merdeka Belajar Kampus Merdeka (MBKM), yang memberikan kesempatan bagi mahasiswa untuk belajar di luar program studi dan terjun langsung ke dunia kerja demi meningkatkan kompetensi dan daya saing.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block px-6 py-2.5 bg-white text-[#C4571A] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Lihat di sini
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-[#6B1B1B] mt-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/assets/logo-bakrie.png" alt="Universitas Bakrie Logo" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </div>

            {/* Partner Logos */}
            <div className="flex items-center gap-4">
              <img src="/assets/ppaip-logo.jpeg" alt="PPAIP Logo" className="h-10 w-auto object-contain rounded opacity-90 hover:opacity-100 transition-opacity" />
              <div className="bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs font-medium w-28 h-12">
                LOGO 3
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
