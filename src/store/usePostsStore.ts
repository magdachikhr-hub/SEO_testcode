import { create } from "zustand";
import { PostType } from "../types";
import {
  createNewPost,
  getPosts,
  removePost,
  updatePost,
} from "../services/posts-services";

interface PostState {
  posts: PostType[];
  totalPages: number | null;
  fetchPosts: (
    page?: number,
    posts_per_page?: number,
    categories?: string[],
    tags?: string[]
  ) => Promise<void>;
  addPost: (data: FormData) => Promise<void>;
  getPostById: (id: string) => PostType | undefined;
  deletePost: (id: string) => Promise<void>;
  changePost: (id: string, data: FormData) => Promise<void>;
}

const usePostsStore = create<PostState>()((set, get) => ({
  posts: [],
  totalPages: 0,
  categories: [],
  tags: [],
  fetchPosts: async (
    page = 1,
    posts_per_page = 10,
    categories = [],
    tags = []
  ) => {
    try {
      const response = await getPosts(page, posts_per_page, categories, tags);
      set({ posts: response.data.posts, totalPages: response.data.totalPages });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
  addPost: async (data) => {
    try {
      const response = await createNewPost(data);
      const updatedPosts = [...get().posts, response.data];
      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Error adding new sponsor", error);
      throw error;
    }
  },
  getPostById: (id) => {
    const post = get().posts.find((item) => item.id === id);
    return post;
  },
  deletePost: async (id) => {
    try {
      await removePost(id);
      const updatedPosts = get().posts.filter((post) => post.id !== id);
      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Error deleting the post", error);
      throw error;
    }
  },
  changePost: async (id, data) => {
    try {
      const response = await updatePost(id, data);
      const updatedPosts = get().posts.map((post) =>
        post.id === id ? response.data : post
      );
      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Error updating the post", error);
      throw error;
    }
  },
}));

export default usePostsStore;
