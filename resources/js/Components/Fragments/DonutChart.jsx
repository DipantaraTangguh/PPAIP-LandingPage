import React from "react";

export function DonutChart({ kub, nonKub, bumn }) {
    const segments = [
        { key: "kub", label: "KUB", value: kub, color: "#E8952E" },
        { key: "nonKub", label: "Non-KUB", value: nonKub, color: "#F5C57A" },
        { key: "bumn", label: "BUMN", value: bumn, color: "#2563EB" },
    ];
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

    // Angka chart dibuat fixed supaya labelnya tetap konsisten di semua layout.
    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 2;

    const toRad = (deg) => (deg * Math.PI) / 180;

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

    // Label ditaruh di tengah slice, tapi slice super kecil mending gak dilabeli.
    const labelPos = (startDeg, endDeg, dist = 0.6) => {
        const midAngle = (startDeg + endDeg) / 2;
        return {
            x: cx + r * dist * Math.cos(toRad(midAngle)),
            y: cy + r * dist * Math.sin(toRad(midAngle)),
            angle: midAngle,
        };
    };

    let cursor = -90;
    const chartSegments = segments.map((segment) => {
        const pct = total > 0 ? (segment.value / total) * 100 : 0;
        const angle = (pct / 100) * 360;
        const startAngle = cursor;
        const endAngle = cursor + angle;
        cursor = endAngle;

        return {
            ...segment,
            pct: Math.round(pct),
            startAngle,
            endAngle,
            labelPosition: labelPos(startAngle, endAngle, 0.55),
        };
    });

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0" style={{ width: size, height: size }}>
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                    >
                        {chartSegments.map((segment) => (
                            <path
                                key={segment.key}
                                d={describeArc(segment.startAngle, segment.endAngle)}
                                fill={segment.color}
                                className="transition-all duration-700"
                            />
                        ))}
                        {chartSegments
                            .filter((segment) => segment.pct >= 8)
                            .map((segment) => (
                                <text
                                    key={`${segment.key}-label`}
                                    x={segment.labelPosition.x}
                                    y={segment.labelPosition.y}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="white"
                                    fontSize={segment.label.length > 4 ? "12" : "16"}
                                    fontWeight="600"
                                >
                                    {segment.label}
                                </text>
                            ))}
                    </svg>
                </div>

                <div className="flex-1 space-y-4">
                    {chartSegments.map((segment, index) => (
                        <React.Fragment key={segment.key}>
                            {index > 0 && <div className="border-t border-gray-100" />}
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-5 h-5 rounded shrink-0"
                                    style={{ backgroundColor: segment.color }}
                                />
                                <span className="text-base font-medium text-gray-700 w-24">
                                    {segment.label}
                                </span>
                                <span className="text-xl font-bold text-gray-900">
                                    {segment.value}
                                </span>
                                <span className="text-[#2E7D32] font-semibold text-base ml-auto">
                                    {segment.pct}%
                                </span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
