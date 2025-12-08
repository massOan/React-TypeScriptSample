import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <span>
                    © {new Date().getFullYear()} MySite. All rights reserved.
                </span>
            </div>
        </footer>
    );
};