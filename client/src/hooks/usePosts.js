import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_COMMENT, CREATE_POST, GET_POSTS } from "../api/graphqlOperations";

export function usePosts() {
  const { data, error, loading, refetch } = useQuery(GET_POSTS);
  const [createPostMutation] = useMutation(CREATE_POST);
  const [createCommentMutation] = useMutation(CREATE_COMMENT);

  const loadPosts = async () => {
    await refetch();
  };

  const createPost = async (input) => {
    await createPostMutation({ variables: { input } });
    await refetch();
  };

  const createComment = async (input) => {
    await createCommentMutation({ variables: { input } });
    await refetch();
  };

  return {
    createComment,
    createPost,
    error,
    isLoading: loading,
    loadPosts,
    posts: data?.posts || [],
  };
}
