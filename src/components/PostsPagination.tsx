import React from "react";
import ReactPaginate from "react-paginate";
import { PostType } from "../types";
import parse from "html-react-parser";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { usePostsStore } from "../store";

type PageClickEvent = {
  selected: number;
};

const Items: React.FC<{ currentPosts: PostType[] }> = ({ currentPosts }) => {
  return (
    <>
      {currentPosts.map((post) => (
        <PostElement to={"/posts/" + post.id} key={post.id}>
          {parse(post.title)}
        </PostElement>
      ))}
    </>
  );
};

const PaginatedPosts: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  const navigate = useNavigate();
  const { totalPages } = usePostsStore();

  const handlePageClick = (event: PageClickEvent) => {
    const newPage = event.selected + 1;
    navigate(`/posts?page=${newPage}`);
  };
  return (
    <>
      <Items currentPosts={posts} />
      <Paginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages || 1}
        previousLabel="< "
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedPosts;

const PostElement = styled(Link)`
  width: 90%;
  border: 1px solid #5d92ce;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  height: 48px;
  padding: 0 10px;
  align-items: center;
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

const Paginate = styled(ReactPaginate)`
  display: flex;
  gap: 15px;
  color: white;
  margin-top: 20px;
  & > li {
    height: fit-content;
    cursor: pointer;
  }
  & > li > a {
    padding: 3px 10px;
    border: 1px solid gray;
    color: black;
    font-size: 18px;
    margin: auto;
    margin-top: 50px;
    border-radius: 8px;
    text-decoration: none;
  }
  & > li.selected > a {
    background-color: #1b6799;
    color: white;
  }
`;
