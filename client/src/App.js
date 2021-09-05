import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/blog/:id">
            <Header />
            <BlogDetail />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
