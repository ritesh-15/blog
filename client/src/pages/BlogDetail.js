import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { ShareOutlined } from "@material-ui/icons";

function BlogDetail() {
  const like = (e) => {
    const id = document.getElementById("like");

    id.classList.toggle("like");
  };

  return (
    <Container>
      <Image>
        <img src="https://source.unsplash.com/1600x900/?nature,water" alt="" />
      </Image>

      <Title>
        <h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui,
          perferendis.
        </h1>
      </Title>

      <Description>
        <About>
          <div>
            <span>Author : </span>
            <h5>Ritesh khore</h5>
          </div>
          <div>
            <span>Published at : </span>
            <h5>4 August 2021</h5>
          </div>
        </About>
        <FavoriteIcon
          id="like"
          onClick={like}
          fontSize="large"
          className="like-icon"
        />
      </Description>

      <Text>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolor
          architecto voluptatibus id tenetur adipisci nostrum fugit quae sequi,
          alias ut repudiandae obcaecati ipsam maiores libero dicta quos ad
          molestiae excepturi debitis dolorum numquam eveniet inventore. Soluta
          neque a illum totam molestias et magnam quis nihil vel voluptate
          repudiandae aliquid praesentium, asperiores architecto animi?
          Perspiciatis, reprehenderit. Quibusdam eveniet velit dignissimos quam
          maiores corporis unde mollitia fugiat excepturi consequatur?
          Exercitationem natus et, aut excepturi tempora sit sint, atque
          repudiandae soluta rerum impedit quas amet ipsa modi nemo cumque eum
          incidunt dignissimos magni! Neque accusantium saepe impedit aliquam
          veritatis facere laboriosam eaque! Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Nemo tempora odio optio rerum eius
          quidem delectus fuga nisi nulla sunt veniam enim laboriosam pariatur
          cum quae, ipsa natus perferendis sapiente repudiandae eligendi
          assumenda obcaecati corporis. Similique nemo asperiores eius doloribus
          eos ut, exercitationem officia a debitis laboriosam sed corrupti
          doloremque odio dicta deserunt ipsum labore, minima facilis iusto
          sapiente sequi tempore? Nam cumque doloribus beatae voluptatibus
          voluptates optio repudiandae et recusandae atque iste praesentium
          alias corrupti, exercitationem neque vel provident veritatis mollitia
          unde architecto inventore quisquam qui impedit. Molestias laborum
          magnam repellendus quas quam nam eum maxime necessitatibus, quae
          earum?
        </p>
      </Text>

      <Comment>
        <form>
          <h1>Comments</h1>
          <div>
            <textarea placeholder="Add a comment"></textarea>
            <button>Post</button>
          </div>
        </form>

        <AllComments>
          <div>
            <span>
              <h1>Ritesh khore</h1>
              <span>11:30am</span>
            </span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Possimus, soluta?
            </p>
          </div>
          <div>
            <span>
              <h1>Ritesh khore</h1>
              <span>11:30am</span>
            </span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Possimus, soluta?
            </p>
          </div>
        </AllComments>
      </Comment>
    </Container>
  );
}

export default BlogDetail;

const Container = styled.div`
  width: 95%;
  max-width: 1300px;
  margin: 1rem auto;
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  animation: loading linear infinite 1s alternate;

  @media (max-width: 768px) {
    height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 1rem;

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.5;
  }
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 1rem;
`;

const About = styled.div`
  div {
    display: flex;

    h5 {
      margin-left: 10px;
    }
  }
`;

const Text = styled.div`
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.8);

  p {
    line-height: 1.5;
    font-size: 1.2rem;
    text-align: justify;
    font-weight: 500;
  }
`;

const Comment = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  form {
    flex: 0.5;

    h1 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    div {
      textarea {
        width: 100%;
        height: 100px;
        border-color: rgba(0, 0, 0, 0.2);
        outline: none;
        padding: 1rem;
        resize: none;
        border-radius: 3px;
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      button {
        padding: 0.6rem 2rem;
        background: #fff;
        border: none;
        outline: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 1rem;
        color: #fff;
        margin-left: auto;
        display: block;
        font-weight: 600;
        background: var(--primary);
      }
    }
  }
`;

const AllComments = styled.div`
  flex: 0.5;
  margin-left: 1rem;
  margin-top: 2.3rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  div {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 3px;
    line-height: 1.5;
    margin-bottom: 1rem;

    span {
      display: flex;
      justify-content: space-between;

      h1 {
        font-weight: 600;
      }
    }
  }
`;
