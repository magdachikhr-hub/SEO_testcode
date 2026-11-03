import styled from "styled-components";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import _ from "lodash";
import { AddEditPost, PostDetail, Posts } from "./pages";
import Produ from "./pages/Produ";
const photos = [
  { id: 1, title: "image1", price: 25 },
  { id: 2, title: "image2", price: 40 },
  { id: 3, title: "image3", price: 15 },
];

const total = _.sumBy(photos, "price");
const cheapest = _.minBy(photos, "price");
const sorted = _.orderBy(photos, ["price"], ["desc"]);

console.log(total);
console.log(cheapest);
console.log(sorted);

function App() {
  return (
    <>
      <ToastContainer />
      <div className="header" style={{ height: "90px" }}>
        {" "}
        this is header
        <div className="navigation" style={{ display: "flex", gap: "30px" }}>
          <Link to={"/posts"}>
            <li>posts</li>
          </Link>
          <Link to={"/posts/:id"}>
            <li>post</li>
          </Link>
          <Link to={"/add-post"}>
            <li>add-post</li>
          </Link>
          <Link to={"/edit-post"}>
            <li>edit-post</li>
          </Link>
        </div>
      </div>
      <Main>
        <PageBox>
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/add-post" element={<AddEditPost />} />
            <Route path="/edit-post/:id" element={<AddEditPost />} />
            <Route path="/produ/:id" element={<Produ></Produ>} />
          </Routes>
        </PageBox>
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  gap: 40px;
  padding-right: 50px;
`;

const PageBox = styled.div`
  width: 100%;
  min-height: 400px;
  height: 80%;
  overflow-y: auto;
  padding: 24px;
  border: 1px solid var(--primary);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
