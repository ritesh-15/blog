import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import moment from "moment";
import { apiGetPost } from "../api/axios";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetPost(id);
        setPost(data.post);
      } catch (err) {}
    })();
  }, [id]);

  const like = (e) => {
    const id = document.getElementById("like");

    id.classList.toggle("like");
  };

  return (
    <Container>
      <Image>
        <img
          src={
            post?.avatar
              ? post.avatar
              : "https://source.unsplash.com/1600x900/?nature,water"
          }
          alt=""
        />
      </Image>

      {!post ? (
        <Skeleton>
          <div></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Skeleton>
      ) : (
        <>
          <Title>
            <h1>{post?.title}</h1>
          </Title>

          <Description>
            <About>
              <div>
                <span>Author : </span>
                <h5>{post?.userId.userName}</h5>
              </div>
              <div>
                <span>Published at : </span>
                <h5>{moment(post?.createdAt).format("D MMMM YYYY")}</h5>
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
            <p>{post?.desc}</p>
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
        </>
      )}
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

const Skeleton = styled.div`
  span {
    animation: loading infinite linear 1s alternate;
    height: 10px;
    width: 100%;
    display: block;
    margin-top: 1rem;
    border-radius: 10px;

    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 50%;
    }
    &:nth-child(4) {
      width: 70%;
    }
    &:nth-child(5) {
      width: 30%;
    }
    &:last-child {
      width: 40%;
    }
  }
`;
