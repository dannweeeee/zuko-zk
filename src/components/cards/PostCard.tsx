"use client";

import ApiService from "@/ApiService";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  key: number;
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const formatDateString = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  const router = useRouter();
  const { loggedInUser } = useGetLoggedInUser();
  const [hasLiked, setHasLiked] = useState(post.hasLiked);

  useEffect(() => {}, [hasLiked]);

  const handleUpVotePost = async (postId: number) => {
    if (loggedInUser) {
      if (!post.hasLiked) {
        setHasLiked(1);
        await ApiService.likePost(loggedInUser.vault_id, postId);
      } else {
        setHasLiked(0);
        await ApiService.unLikePost(loggedInUser.vault_id, postId);
      }
    }
  };

  const handleNavigateToComment = async (post: Post) => {
    const {
      post_id,
      comments_count,
      content,
      group_id,
      hasLiked,
      likes_count,
      timestamp,
      title,
      username,
      vault_id,
    } = post;

    const queryParams = {
      post_id: String(post_id),
      comments_count: String(comments_count),
      content,
      group_id,
      hasLiked: String(hasLiked),
      likes_count: String(likes_count),
      timestamp: String(timestamp),
      title,
      username,
      vault_id,
    };

    router.push(
      `/dashboard/post/${post.post_id}?${new URLSearchParams(
        queryParams
      ).toString()}`
    );
  };

  return (
    <article className={`flex w-full flex-col rounded-xl`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="relative h-11 w-11">
              <Image
                src={`https://api.multiavatar.com/${post.username}.png`}
                alt="Profile Image"
                fill
                className="rounded-full"
              />
            </div>
            <div className="post-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <div className="w-fit">
              <h4 className="font-semibold text-light-1">{post.username}</h4>
            </div>
            <h1 className="mt-2 font-bold text-xl text-light-2">
              {post.title}
            </h1>
            <p className="mt-2 text-small-regular text-sm text-light-2">
              {post.content}
            </p>
            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap3.5">
                <Image
                  onClick={() => handleUpVotePost(post.post_id)}
                  src={
                    hasLiked ? "/assets/heart.svg" : "/assets/heart-gray.svg"
                  }
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/reply.svg"
                  alt="reply"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                  onClick={() => handleNavigateToComment(post)}
                />
                {/* <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-small-regular text-sm text-light-2 font-semibold">
        {formatDateString(post.timestamp)} |{" "}
        <Link href={`/dashboard/community/${post.group_id}`}>
          GroupID: {post.group_id}
        </Link>
      </p>
    </article>
  );
};

export default PostCard;
