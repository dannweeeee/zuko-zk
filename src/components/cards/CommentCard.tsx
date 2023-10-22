import ApiService from "@/ApiService";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { Comment } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  key: number;
  comment: Comment;
}
const CommentCard = ({ comment }: Props) => {
  const { loggedInUser } = useGetLoggedInUser();
  const [hasLiked, setHasLiked] = useState(comment.hasLiked);

  useEffect(() => {}, [hasLiked]);

  const handleUpVotePost = async (commentId: number) => {
    if (loggedInUser) {
      if (!comment.hasLiked) {
        setHasLiked(1);
        await ApiService.likeComment(loggedInUser.vault_id, commentId);
      } else {
        setHasLiked(0);
        await ApiService.unLikeComment(loggedInUser.vault_id, commentId);
      }
    }
  };
  const formatDateString = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <article className={`flex w-full flex-col rounded-xl`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="relative h-11 w-11">
              <Image
                src={`https://api.multiavatar.com/${comment.username}.png`}
                alt="Profile Image"
                fill
                className="rounded-full"
              />
            </div>
            <div className="post-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <div className="w-fit">
              <h4 className="font-semibold text-light-1">{comment.username}</h4>
            </div>
            <p className="mt-2 text-small-regular text-sm text-light-2">
              {comment.content}
            </p>
            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap3.5">
                <Image
                  onClick={() => handleUpVotePost(comment.comment_id)}
                  src={
                    hasLiked ? "/assets/heart.svg" : "/assets/heart-gray.svg"
                  }
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {/* <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-small-regular text-sm text-light-2 font-semibold">
        {formatDateString(comment.timestamp)}
      </p>
    </article>
  );
};

export default CommentCard;
