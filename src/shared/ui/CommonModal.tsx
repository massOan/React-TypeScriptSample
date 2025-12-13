// src/shared/ui/CommonModal.tsx
import React, { useEffect } from "react";

export type CommonModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg";
};

export const CommonModal: React.FC<CommonModalProps> = ({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
}) => {
    // ✅ 훅은 항상 컴포넌트 최상단에서 호출
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    // ✅ 훅 호출 이후에 early return
    if (!open) return null;

    const width =
        size === "sm" ? 420 : size === "lg" ? 840 : 640;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div
                className="modal"
                style={{ width: "100%", maxWidth: width }}
            >
                <div className="modal-header">
                    <div>
                        {title && <h2 className="modal-title">{title}</h2>}
                        {description && (
                            <p className="modal-description">{description}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {children && <div className="modal-body">{children}</div>}

                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
};
