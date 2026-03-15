import { useState, useCallback } from "react";

// ─── useToast ─────────────────────────────────────────────────────────────────
export const useToast = () => {
    const [toast, setToast] = useState(null);

    const show = useCallback((message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    return { toast, show };
};

// ─── useModal ─────────────────────────────────────────────────────────────────
export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = useCallback(() => setIsOpen(true),  []);
    const onClose = useCallback(() => setIsOpen(false), []);
    return { isOpen, onOpen, onClose };
};

// ─── useConfirm ───────────────────────────────────────────────────────────────
export const useConfirm = () => {
    const [pending, setPending] = useState(null);

    const confirm = (message) => new Promise((resolve) => setPending({ message, resolve }));

    const handleConfirm = () => { pending?.resolve(true);  setPending(null); };
    const handleCancel  = () => { pending?.resolve(false); setPending(null); };

    return { pending, confirm, handleConfirm, handleCancel };
};
