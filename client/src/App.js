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
import { useContext, useEffect } from "react";
import userContext from "./context/user/userContext";
import { useLoadingWithRefresh } from "./hooks/userRefreshHooks";
import styled from "styled-components";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import NewBlog from "./pages/NewBlog";
import Update from "./pages/Update";
import { io } from "socket.io-client";
import socketContext from "./context/socket/socketContext";

function App() {
  const loading = useLoadingWithRefresh();
  const { setSocket } = useContext(socketContext);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(socket);
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  return loading ? (
    <Loading>
      <div />
      <p>Loading...</p>
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

          <ProtectedRoute path="/create-blog">
            <Header />
            <NewBlog />
          </ProtectedRoute>

          <LoginRoute path="/login">
            <Auth />
          </LoginRoute>

          <LoginRoute path="/forgot-password">
            <ForgotPassword />
          </LoginRoute>

          <ProtectedRoute path="/profile/:id">
            <Header />
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute path="/update/:id">
            <Header />
            <Update />
          </ProtectedRoute>
        </>
      </Switch>
    </Router>
  );
}

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !user ? (
          <Redirect
            to={{
              pathname: "/login",
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
  flex-direction: column;

  p {
    margin-top: 1rem;
  }

  div {
    width: 50px;
    height: 50px;
    border: 4px solid #fff;
    border-radius: 50%;
    border-top: 4px solid var(--primary);
    border-left: 4px solid var(--primary);
    border-bottom: 4px solid var(--primary);
    animation: spin ease-in infinite 1s;
  }
`;
