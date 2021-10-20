import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import "./Styles/App.scss";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import UserPage from "./Components/User/UserPage";

function App() {
  const [userLogin, setUserLogin] = useState({
    loggedIn: false,
    user: {},
  });
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
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
            <Route exact path="/user">
              <UserPage />
            </Route>
            <Route path="/">
              <h1>Page not found</h1>
            </Route>
          </Switch>
        </section>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
