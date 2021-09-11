import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

function Blog({ title, desc, avatar, user }) {
  return (
    <Container>
      <img src={avatar} alt="" />
      <span>{user}</span>
      <h1>{title}</h1>
      <p>{desc}</p>
      <Actions>
        <FavoriteIcon className="like-icon" />
        <button>
          <Link to="/blog/5">Read more...</Link>
        </button>
      </Actions>
    </Container>
  );
}

export default Blog;

const Container = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1rem;
  transition: all 0.15s ease-in;
  border-radius: 3px;

  &:hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  span {
    padding: 0 1rem;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  h1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
    padding: 0 1rem;
    line-height: 1.5;
  }

  p {
    line-height: 1.5;
    text-overflow: ellipsis;
    height: 70px;
    overflow: hidden;
    padding: 0 1rem;
  }
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  button {
    background: #fff;
    border: none;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    color: var(--primary);
    font-weight: 500;
  }
`;
