import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Blog() {
  return (
    <Container>
      <img
        src="https://images.unsplash.com/photo-1492496913980-501348b61469?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <span>Riteshkhore</span>
      <h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate,
        consequuntur?
      </h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores,
        eligendi debitis facilis ipsum ad enim accusamus ratione ab iure
        excepturi? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Dolores, eligendi debitis facilis ipsum ad enim accusamus ratione ab
        iure excepturi?
      </p>
      <Actions>
        <FavoriteIcon className="like-icon" />
        <button>Read more...</button>
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
