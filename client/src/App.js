import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import Auth from "./pages/Auth";
import { useContext } from "react";
import userContext from "./context/user/userContext";
import { useLoadingWithRefresh } from "./hooks/userRefreshHooks";
import styled from "styled-components";

function App() {
  const loading = useLoadingWithRefresh();

  return loading ? (
    <Loading>
      <div />
    </Loading>
  ) : (
    <Router>
      <Switch>
        <>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/blog/:id">
            <Header />
            <BlogDetail />
          </Route>
          <LoginRoute path="/login">
            <Auth />
          </LoginRoute>
        </>
      </Switch>
    </Router>
  );
}

const LoginRoute = ({ children, ...rest }) => {
  const { user } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );
};

export default App;

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  justify-content: center;

  div {
    width: 50px;
    height: 50px;
    border: 4px solid #fff;
    border-radius: 50%;
    border-top: 4px solid var(--primary);
    border-left: 4px solid var(--primary);
    border-bottom: 4px solid var(--primary);
    animation: spin ease infinite 1s;
  }
`;
