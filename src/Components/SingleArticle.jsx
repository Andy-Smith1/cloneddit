import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleArticle } from "../utils/api";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id).then((articleFromApi) => {
      console.log(articleFromApi);
    });
  }, []);

  return <div></div>;
};

export default SingleArticle;
