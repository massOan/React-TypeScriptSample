import React from "react";
import { PRODUCTS } from "./products";

export const ProductsGrid: React.FC = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Products / Services</h2>
                <p className="section-subtitle">
                    제공하고 싶은 서비스나 포트폴리오 프로젝트를 정리해 둘 수 있습니다.
                </p>

                <div className="card-grid products-grid">
                    {PRODUCTS.map((product) => (
                        <article key={product.name} className="card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className="pill-row">
                                {product.tags.map((tag) => (
                                    <span key={tag} className="pill">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
