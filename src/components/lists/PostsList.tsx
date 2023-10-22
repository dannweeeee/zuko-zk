"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import SkeletonLoading from "../ui/SkeletonLoading";

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
  const [loading, setLoading] = useState(true);

  const { loggedInUser } = useGetLoggedInUser();
  
  useEffect(() => {
    const fetchAllPostsForAllCommunitiesUserIsAPartOf = async () => {
      if (loggedInUser) {
        try {
          const allPosts =
            await ApiService.fetchPostsByGroupIdAndGetLikedByVaultId(
              loggedInUser.vault_id
            );
          setPosts(allPosts);
        } catch (error) {
          console.error("Error fetching communities by vault ID:", error);
        } finally {
          // Set loading to false after the data has been fetched or an error occurred
          setLoading(false);
        }
      }
    };
    fetchAllPostsForAllCommunitiesUserIsAPartOf();
  }, [loggedInUser]);

  return (
    <section className="mt-2 flex flex-col">
    {loading ? (
      <SkeletonLoading />
    ) : (
      posts && posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={post.post_id} post={post} />)
      ) : (
        <p>No Posts Currently</p>
      )
    )}
  </section>
  );
};

export default PostsList;
