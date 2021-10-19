import axios from "axios";

const news = axios.create({
  baseURL: "https://as-news-articles.herokuapp.com/api",
});

export const getArticles = async ({ page, topic }) => {
  const { data } = await news.get("/articles", {
    params: {
      p: page,
      topic: topic,
    },
  });
  return data;
};

export const getTopics = async () => {
  const { data } = await news.get("/topics");
  return data.topics;
};
