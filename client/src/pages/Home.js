import styled from "styled-components";
import Blogs from "../components/Blogs";
import Catagories from "../components/Catagories";

function Home() {
  return (
    <Container>
      <Banner>
        <Text>
          <h1>Create awesome blogs</h1>
          <p>Free blogging site for bloggers</p>
          <button>Create a blog</button>
        </Text>
      </Banner>

      <Main>
        <Catagories />
        <Blogs />
      </Main>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  animation: loading infinite linear alternate 1s;
  justify-content: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
    text-transform: capitalize;
  }

  p {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.8rem 2rem;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
    color: var(--primary);
    font-weight: 600;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to left bottom,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.1)
      ),
      url("https://source.unsplash.com/1600x400/?blog,nature") no-repeat center
        center/cover;
    z-index: -1;
  }
`;

const Text = styled.div`
  width: 95%;
  text-align: center;
`;

const Main = styled.div`
  width: 95%;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 1fr 4fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
