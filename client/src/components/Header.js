import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import userContext from "../context/user/userContext";

function Header() {
  const { user } = useContext(userContext);

  return (
    <Container>
      <Center>
        <Link to="/">
          <span>Home</span>
        </Link>
        <a>
          <span>About</span>
        </a>
        <a>
          <span>Contact Us</span>
        </a>
      </Center>
      <User>
        {!user ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <>
            <Link to={`/profile/${user._id}`}>
              <p>{user.name}</p>
            </Link>
            {user.avatar && (
              <Link to={`/profile/${user._id}`}>
                <img src={user.avatar} alt="" />
              </Link>
            )}
          </>
        )}
      </User>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 60px;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  position: sticky;
  justify-content: space-between;
  top: 0;
  z-index: 100;
  background: #fff;
  left: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Center = styled.div`
  a {
    padding: 0 1rem;
    cursor: pointer;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 0.6rem 2rem;
    background: var(--primary);
    border: none;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    color: #fff;
    font-weight: 600;
    transition: all 0.25s ease-in;
  }

  p {
    text-transform: capitalize;
    font-weight: 500;
  }

  img {
    width: 45px;
    height: 45px;
    margin-left: 1rem;
    border-radius: 50%;
    object-fit: cover;
    animation: loading linear infinite 1s alternate;
    cursor: pointer;
  }
`;
