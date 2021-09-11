import { AddOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { apiNewPost, apiUploadImage } from "../api/axios";
import { useHistory } from "react-router-dom";

const NewBlog = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const publish = async () => {
    if (!title || !description) return;

    setLoading(true);

    let filename = null;

    if (image) {
      const formdata = new FormData();
      formdata.append("file", image);

      try {
        const { data } = await apiUploadImage(formdata);
        filename = data.filename;
      } catch (err) {}
    }

    try {
      const { data } = await apiNewPost({
        title,
        desc: description,
        filename: filename ? filename : "",
      });
      setLoading(false);
      history.push("/");
    } catch (err) {}
  };

  return (
    <Container>
      <Image>
        <img
          src={
            !image
              ? "https://source.unsplash.com/1600x900/?nature,water"
              : URL.createObjectURL(image)
          }
          alt=""
        />
        <input
          type="file"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <div>
            <AddOutlined style={{ color: "#fff", fontSize: "1.8rem" }} />
          </div>
        </label>
      </Image>

      <Options>
        <div>
          <button disabled={loading ? true : false} onClick={publish}>
            {loading ? "Posting..." : "Publish"}
          </button>
        </div>
      </Options>

      <Title>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
      </Title>

      <Description>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is in your mind?"
        ></textarea>
      </Description>
    </Container>
  );
};

export default NewBlog;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1300px;
  padding-top: 1rem;
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  animation: loading linear infinite 1s alternate-reverse;

  input {
    display: none;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  div {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
    transition: all 250ms ease-in;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Title = styled.div`
  margin-top: 1rem;
  width: 100%;

  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: 500;
    resize: none;
    border-radius: 10px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Description = styled.div`
  margin-top: 1rem;

  textarea {
    width: 100%;
    border: none;
    outline: none;
    padding: 1rem 0;
    font-size: 1.2rem;
    font-weight: 500;
    height: max-content;
    resize: none;
    border-radius: 10px;
    height: 500px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Options = styled.div`
  width: 100%;
  margin-top: 1rem;

  div {
    margin-left: auto;

    button {
      padding: 0.7rem 2rem;
      background: var(--primary);
      border: none;
      font-size: 1rem;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      border-radius: 3px;
      display: block;
      margin-left: auto;

      &:disabled {
        opacity: 0.7;
      }
    }
  }
`;
