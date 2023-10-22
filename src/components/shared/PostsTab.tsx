"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { Post } from "@/types";

const PostsTab = ({ group_id }: { group_id: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useGetLoggedInUser();

  useEffect(() => {
    const fetchPostsForUserCommunities = async () => {
      if (loggedInUser) {
        try {
          setLoading(true);
          const postsForCommunity = await ApiService.fetchPostsByGroupId(
            group_id,
            loggedInUser.vault_id
          );

          setPosts(postsForCommunity);
          setLoading(false);
        } catch (error) {}
      }
    };
    fetchPostsForUserCommunities();
  }, [group_id, loggedInUser]);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {loading ? (
        <h1 className="font-semibold text-3xl text-center blue-text-gradient">
          Loading...
        </h1>
      ) : posts.length > 0 ? (
        <>
          {posts.map((post, index) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </>
      ) : (
        <p className="!text-base-regular text-light-3 no-result">
          No Posts Currently
        </p>
      )}
    </section>
  );
};

export default PostsTab;
