import BlogContext from "./blogContext";
import { useState } from "react";

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
