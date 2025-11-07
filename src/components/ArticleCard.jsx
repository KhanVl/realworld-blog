import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const {
    slug,
    title,
    description,
    tagList,
    favoritesCount,
    author,
    createdAt,
  } = article;

  const date = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="article-card">
      <div className="article-card-header">
        <div className="article-meta">
          <div className="author-avatar">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8125 7.4375C3.04167 6.9375 4.21875 6.6875 5.34375 6.6875C6.46875 6.6875 7.63542 6.9375 8.84375 7.4375C10.0729 7.91667 10.6875 8.55208 10.6875 9.34375V10.6875H0V9.34375C0 8.55208 0.604167 7.91667 1.8125 7.4375ZM7.21875 4.5625C6.69792 5.08333 6.07292 5.34375 5.34375 5.34375C4.61458 5.34375 3.98958 5.08333 3.46875 4.5625C2.94792 4.04167 2.6875 3.41667 2.6875 2.6875C2.6875 1.95833 2.94792 1.33333 3.46875 0.8125C3.98958 0.270833 4.61458 0 5.34375 0C6.07292 0 6.69792 0.270833 7.21875 0.8125C7.73958 1.33333 8 1.95833 8 2.6875C8 3.41667 7.73958 4.04167 7.21875 4.5625Z"
                fill="#61BB61"
              />
            </svg>
          </div>
          <div>
            <div className="author-name">{author?.username}</div>
            <div className="article-date">{date}</div>
          </div>
        </div>

        <button className="like-button" disabled>
          <div className="like-button-icon">
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.65625 12.2188L5.6875 11.3438C4.58333 10.3438 3.78125 9.60417 3.28125 9.125C2.78125 8.64583 2.21875 8.05208 1.59375 7.34375C0.989583 6.63542 0.572917 6 0.34375 5.4375C0.114583 4.85417 0 4.26042 0 3.65625C0 2.63542 0.34375 1.77083 1.03125 1.0625C1.73958 0.354167 2.61458 0 3.65625 0C4.86458 0 5.86458 0.46875 6.65625 1.40625C7.44792 0.46875 8.44792 0 9.65625 0C10.6979 0 11.5625 0.354167 12.25 1.0625C12.9583 1.77083 13.3125 2.63542 13.3125 3.65625C13.3125 4.46875 13.0417 5.3125 12.5 6.1875C11.9583 7.0625 11.3646 7.82292 10.7188 8.46875C10.0938 9.11458 9.0625 10.0833 7.625 11.375L6.65625 12.2188Z"
                fill="#61BB61"
              />
            </svg>
          </div>
          <span>{favoritesCount}</span>
        </button>
      </div>

      <Link to={`/articles/${slug}`} className="article-title">
        {title}
      </Link>

      <p className="article-description">{description}</p>

      <div className="tag-list">
        {tagList?.map((tag) => (
          <span key={tag} className="tag">
            {tag || "tag"}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ArticleCard;
