import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
    labelledBy: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ labelledBy, onClose, children }: ModalProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        closeRef.current?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                onClick={e => e.stopPropagation()}>
                <button type="button"
                    ref={closeRef}
                    className="modal-close"
                    aria-label="Close"
                    onClick={onClose}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;