import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
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
        <a>
          <span>Login</span>
        </a>
      </Center>
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
  justify-content: center;
  position: sticky;
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
