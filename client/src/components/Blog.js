import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link, useHistory } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import userContext from "../context/user/userContext";
import {
  apiDeletePost,
  apiIsLikedPost,
  apiLikePost,
  apiUnLikePost,
} from "../api/axios";
import blogContext from "../context/blogs/blogContext";
import { FavoriteOutlined } from "@material-ui/icons";

function Blog({ title, desc, avatar, userInfo, _id, catagory }) {
  const { user } = useContext(userContext);
  const { blogs, setBlogs } = useContext(blogContext);
  const [like, setLike] = useState(false);
  const history = useHistory();

  const deletePost = async () => {
    try {
      await apiDeletePost(_id);
      const deleteBlog = blogs.filter((blog) => blog._id === _id);
      const index = blogs.indexOf(deleteBlog[0]);
      blogs.splice(index, 1);
      setBlogs([]);
      setBlogs(blogs);
    } catch (err) {}
  };

  const changeLike = async () => {
    if (!user) {
      history.push("/login");
      return;
    }

    if (like) {
      setLike(false);

      try {
        await apiUnLikePost(_id);
      } catch (error) {}
      return;
    }

    setLike(true);

    try {
      await apiLikePost(_id);
    } catch (error) {}
    return;
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiIsLikedPost(_id);
        if (data.likeduser) {
          setLike(true);
        }
      } catch (err) {}
    })();
  }, [_id]);

  return (
    <Container>
      <img src={avatar} alt="" />
      <span>
        <small>{userInfo.userName}</small>
        <h4>{catagory}</h4>
      </span>
      <h1>{title}</h1>
      <p>{desc}</p>
      <Actions>
        <div>
          {like ? (
            <FavoriteOutlined
              onClick={changeLike}
              className="like like-animation"
            />
          ) : (
            <FavoriteIcon onClick={changeLike} className="like-icon " />
          )}
          {userInfo._id === user?._id && (
            <Delete onClick={deletePost} className="delete-icon" />
          )}
        </div>
        <button>
          <Link to={`/blog/${_id}`}>Read more...</Link>
        </button>
      </Actions>
    </Container>
  );
}

export default Blog;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1rem;
  transition: all 0.15s ease-in;
  border-radius: 6px;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 1rem;
    animation: loading infinite linear 1s alternate;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;

    small {
      text-transform: capitalize;
    }

    h4 {
      font-weight: 500;
      text-transform: capitalize;
    }
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

  div {
    display: flex;

    p {
      padding: 0;
      height: fit-content;
      margin-left: 10px;
    }
  }

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
