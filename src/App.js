import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import "./Styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <section className="container">
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/articles/:topic">
            <Articles />
          </Route>
          <Route exact path="/article/:article_id">
            <SingleArticle />
          </Route>
          <Route path="/">
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
