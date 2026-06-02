import React from "react";

export function DonutChart({ kub, nonKub }) {
    const total = kub + nonKub;
    const kubPct = Math.round((kub / total) * 100);
    const nonKubPct = 100 - kubPct;

    // Angka chart dibuat fixed supaya labelnya tetap konsisten di semua layout.
    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 2;

    // Mulai dari jam 12 biar slice kecil Non-KUB gampang kebaca.
    const nonKubAngle = (nonKubPct / 100) * 360;
    const toRad = (deg) => (deg * Math.PI) / 180;

    const startAngle = -90;
    const nonKubEnd = startAngle + nonKubAngle;
    const kubEnd = nonKubEnd + (kubPct / 100) * 360;

    // SVG path pie agak verbose, jadi rumus arc-nya dikumpulin di sini.
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

    // Label ditaruh di tengah slice supaya gak tabrakan sama legend.
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
                <div className="shrink-0" style={{ width: size, height: size }}>
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                    >
                        <path
                            d={describeArc(nonKubEnd, kubEnd)}
                            fill="#E8952E"
                            className="transition-all duration-700"
                        />
                        <path
                            d={describeArc(startAngle, nonKubEnd)}
                            fill="#F5C57A"
                            className="transition-all duration-700"
                        />
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

                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded bg-[#E8952E] shrink-0" />
                        <span className="text-base font-medium text-gray-700 w-24">
                            KUB
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                            {kub}
                        </span>
                        <span className="text-[#2E7D32] font-semibold text-base ml-auto">
                            {kubPct}%
                        </span>
                    </div>
                    <div className="border-t border-gray-100" />
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded bg-[#F5C57A] shrink-0" />
                        <span className="text-base font-medium text-gray-700 w-24">
                            Non-KUB
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                            {nonKub}
                        </span>
                        <span className="text-[#2E7D32] font-semibold text-base ml-auto">
                            {nonKubPct}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
