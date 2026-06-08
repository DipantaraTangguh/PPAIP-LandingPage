import { useEffect, useRef } from "react";

/**
 * Custom hook to trap keyboard focus within a modal container.
 * Also restores focus to the previously active element upon unmounting/closing.
 *
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @returns {React.RefObject} Ref to be attached to the modal wrapper element.
 */
export function useFocusTrap(isOpen) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const container = containerRef.current;
        if (!container) return;

        // Standard focusable selectors
        const focusableSelector =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const getFocusableElements = () => {
            const elements = Array.from(container.querySelectorAll(focusableSelector));
            return elements.filter((el) => {
                // Check if element is disabled
                if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") {
                    return false;
                }
                // Check if element is visible
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== "none";
            });
        };

        // Focus the first element on open
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
            // Small timeout to allow transition/fade animation to complete and prevent race conditions
            const timer = setTimeout(() => {
                focusables[0].focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const container = containerRef.current;
        if (!container) return;

        const focusableSelector =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const getFocusableElements = () => {
            const elements = Array.from(container.querySelectorAll(focusableSelector));
            return elements.filter((el) => {
                if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") {
                    return false;
                }
                const rect = el.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== "none";
            });
        };

        const previousFocusedElement = document.activeElement;

        const handleKeyDown = (e) => {
            if (e.key !== "Tab") return;

            const currentFocusables = getFocusableElements();
            if (currentFocusables.length === 0) {
                e.preventDefault();
                return;
            }

            const first = currentFocusables[0];
            const last = currentFocusables[currentFocusables.length - 1];

            if (e.shiftKey) {
                // Shift + Tab: wrap from first to last
                if (document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                // Tab: wrap from last to first
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            // Restore focus on close
            if (previousFocusedElement && typeof previousFocusedElement.focus === "function") {
                previousFocusedElement.focus();
            }
        };
    }, [isOpen]);

    return containerRef;
}
