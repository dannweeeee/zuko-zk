"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import { getCookie } from "@/helper";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";

interface Community {
  group_id: string;
  user_community_id: number;
  vault_id: string;
}

interface PostsByCommunity {
  comments_count: number;
  content: string;
  group_id: string;
  hasLiked: number;
  likes_count: number;
  post_id: number;
  timestamp: number;
  title: string;
  username: string;
  vault_id: string;
}

const PostsList = () => {
  const [posts, setPosts] = useState<PostsByCommunity[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { loggedInUser } = useGetLoggedInUser();
  useEffect(() => {
    const fetchAllPostsForAllCommunitiesUserIsAPartOf = async () => {
      if (loggedInUser) {
        try {
          setLoading(true);
          const allPosts =
            await ApiService.fetchPostsByGroupIdAndGetLikedByVaultId(
              loggedInUser.vault_id
            );
          console.log(allPosts, "all POSTS?");
          setPosts(allPosts);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching communities by vault ID:", error);
        }
      }
    };
    fetchAllPostsForAllCommunitiesUserIsAPartOf();
  }, [loggedInUser]);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {loading ? (
        <h1 className="font-semibold text-3xl text-center blue-text-gradient">
          Loading...
        </h1>
      ) : posts && posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={post.post_id} post={post} />)
      ) : (
        <p className="font-semibold text-3xl text-center blue-text-gradient">
          {posts === null ? "Loading..." : "No Posts Currently"}
        </p>
      )}
    </section>
  );
};

export default PostsList;
