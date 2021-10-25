import { useContext, useState, useEffect } from "react";
import { addNewArticle, getTopics } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import NotFound from "./NotFound";
import "../Styles/NewArticle.scss";

const NewArticle = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("coding");
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleBody, setNewArticleBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { userLogin } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    addNewArticle(
      userLogin.username,
      selectedTopic,
      newArticleTitle,
      newArticleBody
    )
      .then((newArticle) => {
        const url = `/article/${newArticle.article_id}`;
        setIsLoading(false);
        history.push(url);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  if (!userLogin) return <NotFound />;
  return (
    <section className="NewArticle">
      <h1>Create a New Article</h1>
      <form onSubmit={handleSubmit}>
        <select
          onChange={(e) => {
            setSelectedTopic(e.target.value);
          }}
        >
          {topics.map((topic) => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          id="title"
          placeholder="Add a title"
          value={newArticleTitle}
          onChange={(e) => setNewArticleTitle(e.target.value)}
          autoComplete="off"
          required
        />
        <textarea
          value={newArticleBody}
          placeholder="Article body"
          onChange={(e) => setNewArticleBody(e.target.value)}
          required
        />
        <button>Post</button>
        {isLoading && <p className="loading">Loading...</p>}
        {isError && <p className="error">Something went wrong, try again.</p>}
      </form>
    </section>
  );
};

export default NewArticle;
