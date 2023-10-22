import ApiService from "@/ApiService";
import React, { useEffect, useState } from "react";
import CommentCard from "../cards/CommentCard";
import { Comment } from "@/types";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";

interface Props {
  postId: number;
}

const CommentsList = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useGetLoggedInUser();

  useEffect(() => {
    const fetchComments = async () => {
      if (loggedInUser) {
        try {
          setLoading(true);
          const data = await ApiService.fetchCommentsByPostId(
            postId,
            loggedInUser.vault_id
          );
          setComments(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [postId, loggedInUser]);

  return (
    <section className="mt-9 flex flex-col gap-10">
      <h1 className="font-semibold text-xl">Comments </h1>
      {loading ? (
        <h1 className="font-semibold text-3xl text-center blue-text-gradient">
          Loading...
        </h1>
      ) : (
        <>
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))
          ) : (
            <p className="no-result font-semibold">No Comments Currently</p>
          )}
        </>
      )}
    </section>
  );
};

export default CommentsList;
