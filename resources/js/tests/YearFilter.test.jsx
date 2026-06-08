import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { YearFilter } from '@/Components/Layouts/YearFilter';

describe('YearFilter', () => {
    it('marks the active year clearly and emits the selected year', async () => {
        const user = userEvent.setup();
        const onYearChange = vi.fn();

        render(
            <YearFilter
                years={['2023', '2024', '2025']}
                activeYear="2025"
                onYearChange={onYearChange}
            />,
        );

        expect(screen.getByRole('button', { name: '2025' })).toHaveAttribute(
            'aria-pressed',
            'true',
        );
        expect(screen.getByRole('button', { name: '2024' })).toHaveAttribute(
            'aria-pressed',
            'false',
        );

        await user.click(screen.getByRole('button', { name: '2024' }));

        expect(onYearChange).toHaveBeenCalledWith('2024');
    });
});
