import { useContext, useState, useEffect } from "react";
import { addNewArticle, deleteArticle, getTopics } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const NewArticle = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("coding");
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleBody, setNewArticleBody] = useState("");
  const { userLogin } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewArticle(
      userLogin.username,
      selectedTopic,
      newArticleTitle,
      newArticleBody
    ).then((newArticle) => {
      const url = `/article/${newArticle.article_id}`;
      history.push(url);
    });
  };

  return (
    <section>
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
          required
        />
        <textarea
          value={newArticleBody}
          placeholder="Article body"
          onChange={(e) => setNewArticleBody(e.target.value)}
          required
        />
        <button>Post</button>
      </form>
      {/* 
      <button
        onClick={() => {
          deleteArticle(38);
        }}
      >
        Delete
      </button> */}
    </section>
  );
};

export default NewArticle;
