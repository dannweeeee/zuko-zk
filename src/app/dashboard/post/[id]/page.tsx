"use client"

import PostCard from '@/components/cards/PostCard';
import CreateComment from '@/components/forms/CreateComment';
import CommentsList from '@/components/lists/CommentsList';
import React, { useEffect, useState } from 'react';

interface PostCardProps {
  postId: number;
  title: string;
  content: string;
  timestamp: number;
  likes_count: number;
  comments_count: number;
  vaultId: string;
  groupId: string;
  username: string;
}

const PostDetailPage = () => {
  const [post, setPost] = useState<PostCardProps | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const postId = Number(searchParams.get("postId"));
    const timestamp = Number(searchParams.get("timestamp"));
    const likes_count = Number(searchParams.get("likes_count"));
    const comments_count = Number(searchParams.get("comments_count"));

    setPost({
      postId,
      title: searchParams.get("title") || '',
      content: searchParams.get("content") || '',
      timestamp,
      likes_count,
      comments_count,
      vaultId: searchParams.get("vaultId") || '',
      groupId: searchParams.get("groupId") || '',
      username: searchParams.get("username") || '',
    });
  }, []);

  console.log(post, "post");

  return (
    <div>
         <section className="relative">
            <div>
                {post && (
                  <PostCard
                    postId={post.postId}
                    title={post.title}
                    content={post.content}
                    timestamp={post.timestamp}
                    likes_count={post.likes_count}
                    comments_count={post.comments_count}
                    vaultId={post.vaultId}
                    groupId={post.groupId}
                    username={post.username}
                  />
                )}
            </div>
            <div className="mt-7">
              {post && (
                <CommentsList 
                  postId={post?.postId}
                />
              )}
            </div>
            <div className="mt-10">
              {post && (
                <CreateComment 
                  postId={post?.postId}
                />
              )}
            </div>
        </section>
    </div>
  );
};

export default PostDetailPage;
