import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { InternshipProdiGrid } from '@/Components/Layouts/InternshipProdiGrid';

describe('InternshipProdiGrid', () => {
    const catalogUrl = '/storage/student-catalog/Repository Magang 2025 UBakrie.pdf';
    const prodiList = [
        {
            name: 'Ilmu Komunikasi',
            kub: 58,
            nonKub: 27,
            bumn: 15,
            catalogStartPage: 174,
        },
        {
            name: 'Teknik Informatika',
            kub: 72,
            nonKub: 12,
            bumn: 16,
            catalogStartPage: null,
        },
    ];

    it('opens the student catalog lookbook at the selected study program page', async () => {
        const user = userEvent.setup();

        render(
            <InternshipProdiGrid
                prodiList={prodiList}
                catalogUrl={catalogUrl}
                activeYear="2026"
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Buka katalog Teknik Informatika' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Teknik Informatika' })).toBeInTheDocument();
        expect(screen.getByText('Katalog Magang 2026')).toBeInTheDocument();
        expect(screen.getByText('Blank')).toBeInTheDocument();
        expect(screen.getAllByText('Katalog belum tersedia')).toHaveLength(2);
        expect(screen.queryByTitle('Katalog Teknik Informatika')).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: 'Program studi sebelumnya' }));

        expect(screen.getByRole('heading', { name: 'Ilmu Komunikasi' })).toBeInTheDocument();
        expect(screen.getByTitle('Katalog Ilmu Komunikasi')).toHaveAttribute(
            'src',
            '/storage/student-catalog/Repository%20Magang%202025%20UBakrie.pdf#page=174&toolbar=0&navpanes=0&view=FitH',
        );
    });
});
