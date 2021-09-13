import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProvider from "./context/user/userProvider";
import BlogProvider from "./context/blogs/blogProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
