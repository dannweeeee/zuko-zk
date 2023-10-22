"use client";

import ApiService from "@/ApiService";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TimeAgo from "../shared/TimeAgo";

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
  const [likesCount, setLikesCount] = useState(post.likes_count);

  useEffect(() => {}, [hasLiked, likesCount]);

  console.log(likesCount, "Likescount", post.post_id, post.title);

  const handleUpVotePost = async (postId: number) => {
    if (loggedInUser) {
      if (!hasLiked) {
        setHasLiked(1);
        setLikesCount((prev) => prev + 1);
        await ApiService.likePost(loggedInUser.vault_id, postId);
      } else {
        setHasLiked(0);
        setLikesCount((prev) => prev - 1);
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
      community_name,
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
      community_name,
    };

    router.push(
      `/dashboard/post/${post.post_id}?${new URLSearchParams(
        queryParams
      ).toString()}`
    );
  };

  return (
    <article
      className={`flex w-full flex-col hover:bg-primary/5 p-5 rounded-lg cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <a onClick={() => handleNavigateToComment(post)}>
              <div className="relative h-11 w-11">
                <Image
                  src={`https://api.multiavatar.com/${post.username}.png`}
                  alt="Profile Image"
                  fill
                  className="rounded-full"
                />
              </div>
            </a>
            <div className="post-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <a onClick={() => handleNavigateToComment(post)}>
              <div className="w-fit">
                <h4 className="font-semibold text-light-1">{post.username}</h4>
              </div>
              <h1 className="mt-2 font-bold text-xl text-light-2">
                {post.title}
              </h1>
              <p className="mt-2 text-small-regular text-sm text-light-2">
                {post.content}
              </p>
            </a>
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
                <p className="ml-1 text-s text-light-2">{likesCount}</p>
                <Image
                  src="/assets/reply.svg"
                  alt="reply"
                  width={24}
                  height={24}
                  className="ml-3 cursor-pointer object-contain"
                  onClick={() => handleNavigateToComment(post)}
                />
                <p className="text-s text-light-2">{post.comments_count}</p>

                <div className="ml-auto text-sm text-light-2">
                  {post.community_name} | <TimeAgo timestamp={post.timestamp} />
                </div>
                {/* <p className="mt-2 text-small-regular text-sm text-light-2 font-semibold">
                  {formatDateString(post.timestamp)} |{" "}
                  <Link href={`/dashboard/community/${post.group_id}`}></Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
