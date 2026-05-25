import React, { useState } from "react";
import { SectionWrapper } from "../Elements";
import { FaqItem } from "../Fragments";

// ============================================================
// Organism: FaqSection
// ============================================================
export function FaqSection({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="pb-16">
            <SectionWrapper className="space-y-4">
                {items.map((item, index) => (
                    <FaqItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </SectionWrapper>
        </section>
    );
}
