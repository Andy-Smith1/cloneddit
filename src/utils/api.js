import axios from "axios";

const news = axios.create({
  baseURL: "https://as-news-articles.herokuapp.com/api",
});

export const getArticles = async ({ page, topic, sortBy }) => {
  const { data } = await news.get("/articles", {
    params: {
      p: page,
      topic: topic,
      sort_by: sortBy,
    },
  });
  return data;
};

export const getTopics = async () => {
  const { data } = await news.get("/topics");
  return data.topics;
};

export const getSingleArticle = async (article_id) => {
  const { data } = await news.get(`/articles/${article_id}`);
  return data;
};

export const getArticleComments = async ({ article_id, page }) => {
  const { data } = await news.get(`articles/${article_id}/comments`, {
    params: {
      p: page,
    },
  });
  return data.comments;
};

export const getUser = async (username) => {
  const { data } = await news.get(`users/${username}`);
  return data.user;
};

export const createNewUser = async (username, name, avatar_url) => {
  const { data } = await news.post(`/users`, { username, name, avatar_url });
  return data;
};
