import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
    document.getElementById('google-translate-script')?.remove();
    document.cookie =
        'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    delete window.google;
    delete window.googleTranslateElementInit;
    vi.restoreAllMocks();
});

describe('Navbar language switch', () => {
    it('updates the translate cookie and reloads without waiting for Google', async () => {
        const { Navbar } = await import('@/Components/Layouts/Navbar');
        const user = userEvent.setup();
        const reloadPage = vi.fn();

        render(<Navbar links={[]} reloadPage={reloadPage} />);

        expect(
            document.querySelectorAll('#google_translate_element_hidden'),
        ).toHaveLength(1);

        await user.click(screen.getByRole('button', { name: 'EN' }));

        expect(document.cookie).toContain('googtrans=/id/en');
        expect(reloadPage).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
            'aria-pressed',
            'true',
        );

        await user.click(screen.getByRole('button', { name: 'Buka menu' }));

        expect(screen.getAllByRole('button', { name: 'EN' })).toHaveLength(2);
        expect(
            document.querySelectorAll('#google_translate_element_hidden'),
        ).toHaveLength(1);

        await user.click(screen.getAllByRole('button', { name: 'ID' })[0]);

        expect(document.cookie).not.toContain('googtrans=');
        expect(reloadPage).toHaveBeenCalledTimes(2);
    });
});
