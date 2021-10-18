import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import "./Styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <section className="container">
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
