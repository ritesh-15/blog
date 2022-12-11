import styled from "styled-components";
import Blog from "./Blog";

function Blogs({ posts }) {
  return (
    <Container>
      {posts.length ? (
        posts.map(({ title, desc, avatar, userId, _id, catagory }) => (
          <Blog
            key={_id}
            title={title}
            desc={desc}
            avatar={avatar}
            userInfo={userId}
            catagory={catagory}
            _id={_id}
          />
        ))
      ) : (
        <>
          <Skeleton>
            <div></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Skeleton>
          <Skeleton>
            <div></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Skeleton>
          <Skeleton>
            <div></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Skeleton>
        </>
      )}
    </Container>
  );
}

export default Blogs;

const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Skeleton = styled.div`
  div {
    animation: loading infinite linear 1s alternate;
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 10px;
  }

  span {
    animation: loading infinite linear 1s alternate;
    height: 10px;
    width: 100%;
    display: block;
    margin-bottom: 1rem;
    border-radius: 15px;

    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(4) {
      width: 70%;
    }
    &:nth-child(5) {
      width: 50%;
    }
  }
`;
