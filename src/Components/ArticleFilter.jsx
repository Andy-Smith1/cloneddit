import { useState, useEffect } from "react";
import { FaHotjar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";

const ArticleFilter = ({ setSortBy }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <>
      <div className="filter">
        <button onClick={() => setSortBy("comment_count")}>
          <FaHotjar /> TOP
        </button>
        <button onClick={() => setSortBy("created_at")}>
          <MdNewReleases /> NEW
        </button>
      </div>
      <div className="topics">
        <Link to="/">All</Link>
        {topics.map((topic) => {
          return (
            <Link to={`/articles/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ArticleFilter;
