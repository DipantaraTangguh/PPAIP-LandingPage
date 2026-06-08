export function ProgramCard({ name, image, link }) {
    return (
        <a href={link} className="group shrink-0 px-3 block">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative mx-4 mt-4 rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-40 sm:h-48 object-cover"
                    />
                </div>
                <div className="px-4 py-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-800">
                        {name}
                    </h3>
                    <span className="text-sm text-gray-500 group-hover:text-[#ea580c] transition-colors duration-200 flex items-center gap-1">
                        Details <span className="text-lg">→</span>
                    </span>
                </div>
            </div>
        </a>
    );
}
