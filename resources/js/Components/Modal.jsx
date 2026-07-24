import { useEffect, useRef } from 'react';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    onClose = () => {},
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (show && !dialog.open) {
            dialog.showModal();
        } else if (!show && dialog.open) {
            dialog.close();
        }
    }, [show]);

    const maxWidthClass = {
        '2xl': 'sm:max-w-2xl',
        '4xl': 'sm:max-w-4xl',
    }[maxWidth];

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className={`m-auto max-h-[calc(100vh-3rem)] w-full overflow-x-hidden overflow-y-auto rounded-lg bg-white p-0 shadow-xl backdrop:bg-gray-500/75 ${maxWidthClass}`}
        >
            {children}
        </dialog>
    );
}
