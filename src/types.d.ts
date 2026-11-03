export type PostType = {
  title: string;
  content: string;
  id: string;
  poster: string;
};

export type NewPostType = Omit<PostType, "id">;
