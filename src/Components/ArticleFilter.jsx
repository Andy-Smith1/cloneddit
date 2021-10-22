import { useState, useEffect } from "react";
import { FaHotjar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";
import "../Styles/ArticleFilter.scss";

const ArticleFilter = ({ setSortBy }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <>
      <div className="topics">
        <Link className="topic-link" to="/">
          All
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              className="topic-link"
              to={`/articles/${topic.slug}`}
              key={topic.slug}
            >
              {topic.slug}
            </Link>
          );
        })}
      </div>
      <div className="filter">
        <button className="sort " onClick={() => setSortBy("votes")}>
          <FaHotjar /> TOP
        </button>
        <button className="sort" onClick={() => setSortBy("created_at")}>
          <MdNewReleases /> NEW
        </button>
      </div>
    </>
  );
};

export default ArticleFilter;
