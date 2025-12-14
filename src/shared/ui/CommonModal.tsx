import React, { ReactNode, useEffect } from "react";

type ModalSize = "md" | "lg" | "xl";

type CommonModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: ModalSize;
    footer?: ReactNode;
    children: ReactNode;
};

export const CommonModal: React.FC<CommonModalProps> = ({
    open,
    onClose,
    title,
    description,
    size = "xl",
    footer,
    children,
}) => {
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    // ✅ ESC로 닫기(선택)
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className={`modal-dialog modal-${size}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                {/* ✅ 헤더 sticky */}
                <div className="modal-header">
                    <div>
                        {title && <h3 className="modal-title">{title}</h3>}
                        {description && <p className="modal-description">{description}</p>}
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                {/* ✅ body만 스크롤 */}
                <div className="modal-body">{children}</div>

                {/* ✅ 푸터 sticky */}
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
};
