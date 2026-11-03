import styled from "styled-components";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { usePostsStore } from "../store";
import PaginatedPosts from "../components/PostsPagination";

const itemsPerPage = 10;
const Posts = () => {
  const { posts, fetchPosts } = usePostsStore();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const navigate = useNavigate();

  useEffect(() => {
    const getPostsInfo = async () => {
      try {
        await fetchPosts();
      } catch (error) {
        console.log(error);
      }
    };
    getPostsInfo();
  }, []);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        await fetchPosts(page ? +page : 1, itemsPerPage);
      } catch (error) {
        console.error(error);
      }
    };
    if (page) {
      loadPosts();
    } else {
      navigate(`/posts?page=1`);
    }
  }, [fetchPosts, page]);
  return (
    <>
    
      <Title>სტატიები</Title>
      <PaginatedPosts posts={posts} />
      
      <SubmitBtn to="/add-post">ახალი სტატიის დამატება</SubmitBtn>
     <h4>products </h4>
     <img src="/image.png" alt="" />
     <img src="/image-2.png" alt="" />
     <button style={{backgroundColor: 'grey'}}>✅</button>

    </>
  );
};

export default Posts;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 100px;
`;

const SubmitBtn = styled(Link)`
  padding: 10px 20px;
  background-color: #15be15;
  color: white;
  font-size: 18px;
  margin: auto;
  margin-top: 50px;
  border-radius: 8px;
  text-decoration: none;
`;
