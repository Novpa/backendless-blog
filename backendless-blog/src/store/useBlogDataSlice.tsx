import { create } from "zustand";

interface Posts {
  title: string;
  author: string;
  content: string;
  createdDate: string;
}

interface BlogDataSlice {
  posts: Posts[];
  getPostsData: (postsData: Posts) => void;
}

const useBlogDataSlice = create<BlogDataSlice>((set) => ({
  posts: [],
  getPostsData: (postsData) =>
    set((state) => {
      return { posts: [...state.posts, postsData] };
    }),
}));

export default useBlogDataSlice;
