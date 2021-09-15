import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  apiDeletePost,
  apiGetComments,
  apiGetPost,
  apiIsLikedPost,
  apiLikePost,
  apiNewComment,
  apiTotalLikes,
  apiUnLikePost,
} from "../api/axios";
import { Delete, Edit, FavoriteOutlined } from "@material-ui/icons";
import userContext from "../context/user/userContext";
import blogContext from "../context/blogs/blogContext";
import { Link } from "react-router-dom";
import socketContext from "../context/socket/socketContext";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(userContext);
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const history = useHistory();
  const { blogs, setBlogs } = useContext(blogContext);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const { socket } = useContext(socketContext);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetComments(id);
        setComments(data.comments);
      } catch (err) {}
    })();
  }, [id]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-blog", id);
  }, [id, socket]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetPost(id);
        setPost(data.post);
      } catch (err) {}
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiIsLikedPost(id);
        if (data.likeduser) {
          setLike(true);
        }
      } catch (err) {}
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiTotalLikes(id);
        setLikes(data.likes);
      } catch (err) {}
    })();
  }, [id, post]);

  const changeLike = async () => {
    if (!user) {
      history.push("/login");
      return;
    }

    if (like) {
      setLike(false);
      try {
        await apiUnLikePost(id);
      } catch (error) {}
      return;
    }

    setLike(true);
    try {
      await apiLikePost(id);
    } catch (error) {}
    return;
  };

  const deletePost = async () => {
    try {
      await apiDeletePost(id);
      history.push("/");
      const deleteBlog = blogs.filter((blog) => blog._id === id);
      const index = blogs.indexOf(deleteBlog[0]);
      blogs.splice(index, 1);
      setBlogs([]);
      setBlogs(blogs);
    } catch (err) {}
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("comment", (comment) => {
      setComments((c) => [comment, ...c]);
    });

    return () => {
      socket.off();
    };
  }, [comments, socket]);

  const postComment = async (e) => {
    e.preventDefault();

    if (!user) {
      history.push("/login");
      return;
    }

    setSending(true);

    try {
      const { data } = await apiNewComment(id, { message });
      const comment = data.comment;
      comment.userId = user;
      socket.emit("new-comment", comment);
      setMessage("");
      setSending(false);
    } catch (err) {
      setSending(false);
    }
  };

  return (
    <Container>
      <Image>
        <img src={post?.avatar} alt="" />
      </Image>

      {!post ? (
        <Skeleton>
          <div></div>
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
                <span>Catagory : </span>
                <h5>{post?.catagory}</h5>
              </div>
              <div>
                <span>Published at : </span>
                <h5>{moment(post?.createdAt).format("D MMMM YYYY")}</h5>
              </div>
            </About>
            <span>
              {post?.userId._id === user?._id && (
                <Link to={`/update/${post._id}`}>
                  <Edit className="edit-icon" fontSize="large" />
                </Link>
              )}

              {like ? (
                <FavoriteOutlined
                  onClick={changeLike}
                  fontSize="large"
                  className="like like-animation"
                />
              ) : (
                <FavoriteIcon
                  onClick={changeLike}
                  fontSize="large"
                  className="like-icon "
                />
              )}
              {post?.userId._id === user?._id && <p>{likes}</p>}
              {post?.userId._id === user?._id && (
                <Delete
                  onClick={deletePost}
                  fontSize="large"
                  className="delete-icon"
                />
              )}
            </span>
          </Description>

          <Text>
            <p>{post?.desc}</p>
          </Text>

          <Comment>
            <form>
              <h1>Comments</h1>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a comment"
                ></textarea>
                <button
                  disabled={sending || !message ? true : false}
                  onClick={postComment}
                >
                  {sending ? "Posting..." : "Post"}
                </button>
              </div>
            </form>

            <AllComments>
              {comments.map(({ message, userId, _id, createdAt }) => (
                <div key={_id}>
                  <span>
                    <h1>{userId.userName}</h1>
                    <span>{moment(createdAt).format("hh:mm:A")}</span>
                  </span>
                  <p>{message}</p>
                </div>
              ))}
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
    border-radius: 10px;
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

  span {
    display: flex;
    align-items: center;

    p {
      margin-left: 10px;
      font-size: 1.25rem;
    }
  }
`;

const About = styled.div`
  div {
    display: flex;

    h5 {
      margin-left: 10px;
      text-transform: capitalize;
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

        &:disabled {
          opacity: 0.7;
          cursor: default;
        }
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
