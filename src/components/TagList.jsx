import React from "react";

const mockTags = ["one", "something", "chinese", "english", "french"];

const TagList = () => {
  return (
    <section className="popular-tags">
      <h3 className="popular-tags-title">Popular tags</h3>
      <div className="popular-tags-list">
        {mockTags.map((tag) => (
          <button key={tag} className="tag tag-pill" type="button">
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagList;