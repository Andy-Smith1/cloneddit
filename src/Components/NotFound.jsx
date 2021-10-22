import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="NotFound">
      <h1>Page not found</h1>
      <Link to="/">Go Home</Link>
    </section>
  );
};

export default NotFound;
