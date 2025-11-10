import React, { useEffect, useState } from "react";
import { fetchTags } from "../api/articles";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadTags = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchTags();
        if (!cancelled) {
          setTags(data.tags || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Load tags error", err);
          setError("Failed to load tags");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTags();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="popular-tags">
      <h3 className="popular-tags-title">Popular tags</h3>

      {loading && <div className="popular-tags-list">Loading tags...</div>}

      {error && !loading && (
        <div className="popular-tags-list">Error loading tags</div>
      )}

      {!loading && !error && (
        <div className="popular-tags-list">
          {tags.map((tag) => (
            <button key={tag} className="tag tag-pill" type="button">
              {tag}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default TagList;