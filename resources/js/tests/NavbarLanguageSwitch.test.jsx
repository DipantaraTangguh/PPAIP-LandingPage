import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
    document.getElementById('google-translate-script')?.remove();
    document.querySelector('.goog-te-combo')?.remove();
    delete window.google;
    delete window.googleTranslateElementInit;
    vi.restoreAllMocks();
});

describe('Navbar language switch', () => {
    it('shares one Google widget and waits until the async translator is ready', async () => {
        window.google = {
            translate: {
                TranslateElement: class {
                    constructor() {
                        window.setTimeout(() => {
                            const combo = document.createElement('select');
                            combo.className = 'goog-te-combo';
                            combo.innerHTML = '<option value="en">English</option>';
                            document
                                .getElementById('google_translate_element_hidden')
                                ?.appendChild(combo);
                        }, 10);
                    }
                },
            },
        };

        const { Navbar } = await import('@/Components/Layouts/Navbar');
        const user = userEvent.setup();

        const firstRender = render(<Navbar links={[]} />);

        expect(
            document.querySelectorAll('#google_translate_element_hidden'),
        ).toHaveLength(1);

        await user.click(screen.getByRole('button', { name: 'EN' }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
                'aria-pressed',
                'true',
            );
        });

        await user.click(screen.getByRole('button', { name: 'Buka menu' }));

        expect(screen.getAllByRole('button', { name: 'EN' })).toHaveLength(2);
        expect(
            document.querySelectorAll('#google_translate_element_hidden'),
        ).toHaveLength(1);

        firstRender.unmount();
        render(<Navbar links={[]} />);

        await waitFor(() => {
            expect(document.querySelectorAll('.goog-te-combo')).toHaveLength(1);
        });
    });
});
