import React, { useState } from "react";

export function DonutChart({ kub, nonKub, bumn }) {
    const [activeKey, setActiveKey] = useState(null);
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

    const popOut = (angle, distance = 7) => ({
        x: distance * Math.cos(toRad(angle)),
        y: distance * Math.sin(toRad(angle)),
    });

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
            midAngle: (startAngle + endAngle) / 2,
            labelPosition: labelPos(startAngle, endAngle, 0.55),
        };
    });
    const activeSegment =
        chartSegments.find((segment) => segment.key === activeKey) ||
        chartSegments[0];

    return (
        <div
            className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            onMouseLeave={() => setActiveKey(null)}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div
                    className="relative shrink-0"
                    style={{ width: size, height: size }}
                >
                    <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        className="drop-shadow-sm"
                    >
                        {chartSegments.map((segment) => {
                            const isActive = activeKey === segment.key;
                            const offset = isActive
                                ? popOut(segment.midAngle)
                                : { x: 0, y: 0 };

                            return (
                                <path
                                    key={segment.key}
                                    d={describeArc(segment.startAngle, segment.endAngle)}
                                    fill={segment.color}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`${segment.label}: ${segment.value} (${segment.pct}%)`}
                                    transform={`translate(${offset.x} ${offset.y})`}
                                    onMouseEnter={() => setActiveKey(segment.key)}
                                    onFocus={() => setActiveKey(segment.key)}
                                    onBlur={() => setActiveKey(null)}
                                    className={`cursor-pointer outline-none transition-all duration-300 ease-out ${
                                        activeKey && !isActive
                                            ? "opacity-45"
                                            : "opacity-100"
                                    }`}
                                    style={{
                                        filter: isActive
                                            ? "drop-shadow(0 10px 14px rgba(15, 23, 42, 0.22))"
                                            : "drop-shadow(0 2px 4px rgba(15, 23, 42, 0.08))",
                                    }}
                                />
                            );
                        })}
                        {chartSegments
                            .filter((segment) => segment.pct >= 8)
                            .map((segment) => {
                                const isActive = activeKey === segment.key;
                                const offset = isActive
                                    ? popOut(segment.midAngle)
                                    : { x: 0, y: 0 };

                                return (
                                    <text
                                        key={`${segment.key}-label`}
                                        x={segment.labelPosition.x + offset.x}
                                        y={segment.labelPosition.y + offset.y}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fill="white"
                                        fontSize={segment.label.length > 4 ? "12" : "16"}
                                        fontWeight="600"
                                        pointerEvents="none"
                                        className="transition-all duration-300 ease-out"
                                    >
                                        {segment.label}
                                    </text>
                                );
                            })}
                    </svg>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white/90 text-center shadow-sm ring-1 ring-black/5 backdrop-blur">
                            <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
                                {activeSegment.label}
                            </span>
                            <span className="text-xl font-extrabold text-gray-900">
                                {activeSegment.pct}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    {chartSegments.map((segment, index) => (
                        <React.Fragment key={segment.key}>
                            {index > 0 && <div className="border-t border-gray-100" />}
                            <button
                                type="button"
                                onMouseEnter={() => setActiveKey(segment.key)}
                                onFocus={() => setActiveKey(segment.key)}
                                onBlur={() => setActiveKey(null)}
                                onClick={() =>
                                    setActiveKey((current) =>
                                        current === segment.key ? null : segment.key,
                                    )
                                }
                                className={`flex w-full items-center gap-4 rounded-lg px-2 py-1.5 text-left transition-all duration-300 ${
                                    activeKey === segment.key
                                        ? "bg-gray-50 shadow-sm"
                                        : "hover:bg-gray-50"
                                }`}
                            >
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
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
