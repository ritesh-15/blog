import styled from "styled-components";

function Catagories() {
  return (
    <Container>
      <h1>Catagories</h1>
      <div className="active">
        <span>All</span>
      </div>
      <div>
        <span>Movies</span>
      </div>
      <div>
        <span>Sports</span>
      </div>
      <div>
        <span>Entertenment</span>
      </div>
      <div>
        <span>Music</span>
      </div>
      <div>
        <span>Tech</span>
      </div>
    </Container>
  );
}

export default Catagories;

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: 3px;

  h1 {
    padding: 1rem 0;
    font-weight: 600;
  }

  div {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 0.3rem;
  }
`;
