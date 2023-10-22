"use client";

import PostCard from "@/components/cards/PostCard";
import CreateComment from "@/components/forms/CreateComment";
import CommentsList from "@/components/lists/CommentsList";
import { Post } from "@/types";
import React, { useEffect, useState } from "react";

const PostDetailPage = () => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const post_id = Number(searchParams.get("post_id"));
    const comments_count = Number(searchParams.get("comments_count"));
    const content = searchParams.get("content") || "";
    const group_id = searchParams.get("group_id") || "";
    const hasLiked = Number(searchParams.get("hasLiked"));
    const likes_count = Number(searchParams.get("likes_count"));
    const timestamp = Number(searchParams.get("timestamp"));
    const title = searchParams.get("title") || "";
    const username = searchParams.get("username") || "";
    const vault_id = searchParams.get("vault_id") || "";

    setPost({
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
    });
  }, []);

  console.log(post, "post");

  return (
    <div>
      <section className="relative">
        <div>{post && <PostCard key={post.post_id} post={post} />}</div>
        <div className="mt-7">
          {post && <CommentsList postId={post?.post_id} />}
        </div>
        <div className="mt-10">
          {post && <CreateComment postId={post?.post_id} />}
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;
