import React from "react";
export function InternshipProdiCard({ name, kub, nonKub }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer">
            <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm text-gray-800">
                    {name}
                </span>
                <span className="text-gray-400 text-lg">›</span>
            </div>
            <div className="w-full h-3 flex rounded-full overflow-hidden mb-3">
                <div
                    className="bg-[#D4871C] transition-all duration-500"
                    style={{ width: `${kub}%` }}
                />
                <div
                    className="bg-[#2E7D32] transition-all duration-500"
                    style={{ width: `${nonKub}%` }}
                />
            </div>
            <div className="flex justify-between text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#D4871C] rounded-sm" />
                    <span className="font-medium text-gray-700">{kub} %</span>
                    <span className="text-gray-400 ml-1">KUB</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-[#2E7D32] rounded-sm" />
                    <span className="font-medium text-gray-700">
                        {nonKub} %
                    </span>
                    <span className="text-gray-400 ml-1">Non-KUB</span>
                </div>
            </div>
        </div>
    );
}
