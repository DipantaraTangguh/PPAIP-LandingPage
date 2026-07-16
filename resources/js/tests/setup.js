import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom belum implementasi <dialog> showModal/close (jsdom#3294).
HTMLDialogElement.prototype.showModal ??= function () {
    this.open = true;
};
HTMLDialogElement.prototype.close ??= function () {
    this.open = false;
    this.dispatchEvent(new Event('close'));
};

afterEach(() => {
    cleanup();
});
