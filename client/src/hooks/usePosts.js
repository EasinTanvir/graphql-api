import { useCallback, useEffect, useState } from "react";
import { blogApi } from "../api/blogApi";

export function usePosts(token) {
  const [posts, setPosts] = useState([]);
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

  const createPost = async (input) => {
    await blogApi.createPost(input, token);
    await loadPosts();
  };

  const createComment = async (input) => {
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
