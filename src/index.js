import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProvider from "./context/user/userProvider";
import BlogProvider from "./context/blogs/blogProvider";
import SocketProvider from "./context/socket/socketProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BlogProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </BlogProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
