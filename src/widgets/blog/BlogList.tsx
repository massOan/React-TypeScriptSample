// src/widgets/blog/BlogList.tsx
import React from "react";
import { POSTS, Post } from "./posts";

export const BlogList: React.FC = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Blog / Notes</h2>
                <p className="section-subtitle">
                    개발 경험이나 기술 메모를 정리하는 공간으로 사용할 수 있습니다.
                </p>

                <div className="blog-list">
                    {POSTS.map((post: Post) => (
                        <article key={post.id} className="blog-item">
                            <h3>{post.title}</h3>
                            <p className="blog-date">{post.date}</p>
                            <p className="blog-summary">{post.summary}</p>
                            <button className="btn-ghost blog-read-more">Read more</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
