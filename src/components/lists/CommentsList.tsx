import ApiService from "@/ApiService";
import React, { useEffect, useState } from "react";
import CommentCard from "../cards/CommentCard";

interface Props {
  postId: number;
}

interface UserData {
  username: string;
  vaultId: string;
}

interface Comment {
  comment_id: number;
  content: string;
  likes_count: number;
  post_id: number;
  timestamp: number;
  vault_id: string;
}

const CommentsList = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [usernames, setUsernames] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await ApiService.fetchCommentsByPostId(postId);
        setComments(data);
        console.log("Comments:", data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (comments && comments.length > 0) {
      const fetchUsernames = async () => {
        const usernames = await Promise.all(
          comments.map((comment) =>
            ApiService.fetchUserByVaultId(comment.vault_id)
          )
        );
        setUsernames(usernames);
        setLoading(false);
      };
      fetchUsernames();
    }
    if (comments && comments.length == 0) {
      setLoading(false);
    }
  }, [comments]);

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
