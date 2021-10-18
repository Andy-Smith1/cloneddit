import axios from "axios";

const news = axios.create({
  baseURL: "https://as-news-articles.herokuapp.com/api",
});

export const getArticles = async (page) => {
  const { data } = await news.get("/articles", {
    params: {
      p: page,
    },
  });
  return data;
};
