import { useState, useEffect, useContext } from "react";
import { FaHotjar } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";
import "../Styles/ArticleFilter.scss";
import { UserContext } from "../contexts/UserContext";

const ArticleFilter = ({ setSortBy, sortBy }) => {
  const [topics, setTopics] = useState([]);
  const { userLogin } = useContext(UserContext);

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
      <div className="filter-create-container">
        <div className="filter">
          <button
            className={sortBy === "votes" ? "selectedOrder" : "sort"}
            onClick={() => setSortBy("votes")}
          >
            <FaHotjar /> TOP
          </button>
          <button
            className={sortBy === "created_at" ? "selectedOrder" : "sort"}
            onClick={() => setSortBy("created_at")}
          >
            <MdNewReleases /> NEW
          </button>
        </div>
        {userLogin && (
          <Link to="/new-article">
            <button className="create-post-btn">
              <IoIosCreate />
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ArticleFilter;
