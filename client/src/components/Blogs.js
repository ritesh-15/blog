import styled from "styled-components";
import Blog from "./Blog";
import { apiGetPosts } from "../api/axios";
import { useEffect, useState } from "react";

function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetPosts();
        console.log(data.posts);
        setPosts(data.posts);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      {posts.map(({ title, desc, avatar, userId }) => (
        <Blog
          title={title}
          desc={desc}
          avatar={avatar}
          user={userId.userName}
        />
      ))}
    </Container>
  );
}

export default Blogs;

const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
`;
