import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { usePostsStore } from "../store";
import { CloseIcon, DeleteIcon } from "../svg";
import { useState } from "react";
import { Modal } from "../components";
const PostDetail = () => {
  const { getPostById, deletePost } = usePostsStore();
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    return <div>Post not Found</div>;
  }
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const post = getPostById(id);
  console.log("post", post);
  return (
    <>
      <OptionsBox>
        {/* <EditIcon onClick={() => navigate("/edit-post/" + post?.id)} /> */}
        <DeleteIcon onClick={() => setShowDeleteModal(true)} />
        <CloseIcon onClick={() => navigate("/posts")} />
      </OptionsBox>
      <Title>{post?.title}</Title>
      {post && (
        <StyledPoster
          src={
            post.poster.startsWith("http")
              ? post.poster
              : import.meta.env.VITE_API_URL + post.poster
          }
        />
      )}
      <Article>{parse(post?.content || "")}</Article>
      {showDeleteModal && (
        <Modal>
          <DeleteBox>
            <h2>ნამდვილად გსურთ სტატიის წაშლა?!</h2>
            <h4 style={{ marginTop: "10px" }}>
              წაშლილი სტატია სამუდამოდ გაქრება სისტემიდან
            </h4>
            <Btns>
              <DeleteBtn
                onClick={() => {
                  deletePost(post?.id || "");
                  navigate("/posts");
                }}
              >
                წაშლა
              </DeleteBtn>
              <CancelBtn onClick={() => setShowDeleteModal(false)}>
                გამოსვლა
              </CancelBtn>
            </Btns>
          </DeleteBox>
        </Modal>
      )}
    </>
  );
};

export default PostDetail;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const OptionsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const SubmitBtn = styled.button`
  padding: 10px 20px;
  background-color: #15be15;
  color: white;
  font-size: 18px;
  margin: auto;
  margin-top: 50px;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  margin-right: auto;
`;

const DeleteBtn = styled(SubmitBtn)`
  background-color: #ea5555;
  &:hover {
    background-color: #ff9898;
  }
`;

const CancelBtn = styled(SubmitBtn)`
  background-color: #635fc7;
  &:hover {
    background-color: #a8a4ff;
  }
`;

const Article = styled.div`
  margin-top: 20px;
  max-width: 700px;
  & > p {
    width: 100%;
  }
  & > p > img {
    width: 100%;
    height: auto;
  }
`;

const DeleteBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border: 1px solid var(--primary);
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const StyledPoster = styled.img`
  width: 300px;
  height: auto;
  margin: auto;
`;
