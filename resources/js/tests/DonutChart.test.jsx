import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { DonutChart } from '@/Components/Fragments/DonutChart';

describe('DonutChart', () => {
    it('shows KUB, Non-KUB, and BUMN percentages from the summary data', () => {
        render(<DonutChart kub={60} nonKub={30} bumn={10} />);

        expect(screen.getByRole('button', { name: 'KUB: 60 (60%)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Non-KUB: 30 (30%)' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'BUMN: 10 (10%)' })).toBeInTheDocument();
        expect(screen.getAllByText('60%')).toHaveLength(2);
        expect(screen.getAllByText('30%')).toHaveLength(1);
        expect(screen.getAllByText('10%')).toHaveLength(1);
    });

    it('updates the center summary when a segment is selected', async () => {
        const user = userEvent.setup();

        render(<DonutChart kub={60} nonKub={30} bumn={10} />);

        await user.click(screen.getByRole('button', { name: 'BUMN: 10 (10%)' }));

        expect(screen.getAllByText('BUMN').length).toBeGreaterThanOrEqual(2);
        expect(screen.getAllByText('10%')).toHaveLength(2);
    });
});
