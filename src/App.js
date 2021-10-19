import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
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
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
