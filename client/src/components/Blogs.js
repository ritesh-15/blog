import styled from "styled-components";
import Blog from "./Blog";

function Blogs() {
  return (
    <Container>
      <Blog />
      <Blog />
      <Blog />
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
