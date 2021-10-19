import { useState, useEffect } from "react";
import { FaHotjar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";

const ArticleFilter = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <>
      <div className="filter">
        <FaHotjar />
        <MdNewReleases />
        <BsFillArrowUpCircleFill />
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
