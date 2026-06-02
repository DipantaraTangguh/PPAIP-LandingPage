import React from "react";
export function CarouselDot({ isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                isActive
                    ? "bg-[#802324] scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label="Go to slide"
        />
    );
}
