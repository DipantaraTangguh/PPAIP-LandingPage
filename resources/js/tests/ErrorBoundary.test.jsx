import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@/Components/ErrorBoundary';

function BrokenComponent() {
    throw new Error('Render gagal');
}

describe('ErrorBoundary', () => {
    let consoleError;
    let preventExpectedError;

    beforeEach(() => {
        consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
        preventExpectedError = (event) => event.preventDefault();
        window.addEventListener('error', preventExpectedError);
    });

    afterEach(() => {
        window.removeEventListener('error', preventExpectedError);
        consoleError.mockRestore();
    });

    it('shows a friendly fallback when a child crashes', () => {
        const onError = vi.fn();

        render(
            <ErrorBoundary onError={onError}>
                <BrokenComponent />
            </ErrorBoundary>,
        );

        expect(screen.getByRole('heading', { name: 'Halaman gagal dimuat' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Coba lagi' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Ke beranda' })).toHaveAttribute('href', '/');
        expect(onError).toHaveBeenCalled();
    });

    it('can retry rendering the children', async () => {
        const user = userEvent.setup();
        let shouldThrow = true;

        function MaybeBroken() {
            if (shouldThrow) {
                throw new Error('Render gagal');
            }

            return <p>Konten sudah normal</p>;
        }

        render(
            <ErrorBoundary onError={vi.fn()}>
                <MaybeBroken />
            </ErrorBoundary>,
        );

        shouldThrow = false;
        await user.click(screen.getByRole('button', { name: 'Coba lagi' }));

        expect(screen.getByText('Konten sudah normal')).toBeInTheDocument();
    });
});
