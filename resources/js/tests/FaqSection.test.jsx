import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { FaqSection } from '@/Components/Layouts/FaqSection';

describe('FaqSection', () => {
    const items = [
        {
            question: 'Bagaimana program PPAIP nyambung ke industri?',
            answer: 'Lewat internship, sertifikasi, praktisi mengajar, dan KUB Talk.',
        },
        {
            question: 'Kenapa Experience The Real Thing penting?',
            answer: 'Mahasiswa ketemu konteks kerja yang real sebelum lulus.',
        },
    ];

    it('opens one answer at a time and closes the previous item', async () => {
        const user = userEvent.setup();

        render(<FaqSection items={items} />);

        const firstQuestion = screen.getByRole('button', {
            name: 'Bagaimana program PPAIP nyambung ke industri?',
        });
        const secondQuestion = screen.getByRole('button', {
            name: 'Kenapa Experience The Real Thing penting?',
        });

        expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

        await user.click(firstQuestion);

        expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
        expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');
        expect(
            screen.getByText('Lewat internship, sertifikasi, praktisi mengajar, dan KUB Talk.'),
        ).toBeInTheDocument();

        await user.click(secondQuestion);

        expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
        expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    });
});
