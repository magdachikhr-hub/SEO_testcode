import { AxiosResponse } from "axios";
import { PostType } from "../types";
import axios from "./axios";

export const getPosts = async (
  page: number = 1,
  posts_per_page: number = 10,
  categories: string[] = [],
  tags: string[] = []
): Promise<
  AxiosResponse<{
    posts: PostType[];
    totalPosts: number;
    totalPages: number;
    currentPage: number;
  }>
> => {
  try {
    const response = await axios.get<{
      posts: PostType[];
      totalPosts: number;
      totalPages: number;
      currentPage: number;
    }>("/posts", {
      params: {
        page,
        posts_per_page,
        categories: categories.length ? categories : undefined,
        tags: tags.length ? tags : undefined,
      },
    });
    return response;
  } catch (error) {
    throw new Error(`Error fetching posts: ${error}`);
  }
};

export const createNewPost = (data: FormData) => {
  return axios.post(`/posts`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const removePost = (id: string) => {
  return axios.delete("/posts/" + id);
};

export const updatePost = (id: string, data: FormData) => {
  return axios.put("/posts/" + id, data);
};
export const uploadImage = (data: FormData) => {
  return axios.post("/posts/images/upload", data);
};
