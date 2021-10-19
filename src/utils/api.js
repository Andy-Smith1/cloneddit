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
