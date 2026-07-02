import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../api/blogApi";
import type { Post } from "../types/blog";

export function usePosts(token: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    const data = await blogApi.getPosts();
    setPosts(data.posts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPosts().catch(() => setIsLoading(false));
  }, [loadPosts]);

  const createPost = async (input: { title: string; content: string }) => {
    await blogApi.createPost(input, token);
    await loadPosts();
  };

  const createComment = async (input: { postId: string; content: string }) => {
    await blogApi.createComment(input, token);
    await loadPosts();
  };

  return {
    createComment,
    createPost,
    isLoading,
    loadPosts,
    posts,
  };
}
