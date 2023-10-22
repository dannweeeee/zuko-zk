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
  const [groupId, setGroupId] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostsByCommunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);

  const { loggedInUser } = useGetLoggedInUser();
  useEffect(() => {
    if (loggedInUser) {
      // Call the fetchCommunityByVaultId API
      ApiService.fetchCommunityByVaultId(loggedInUser.vault_id)
        .then((response) => {
          setCommunities(response.results || []);
          setGroupId(response.results?.[0]?.group_id || null);
          console.log("Communities:", response.results);
        })
        .catch((error) => {
          console.error("Error fetching communities by vault ID:", error);
        });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (communities.length > 0 && loggedInUser) {
      const fetchAllPostsForAllCommunitiesUserIsAPartOf = async () => {
        const posts = await Promise.all(
          communities.map(async (community) => {
            const communityPosts =
              await ApiService.fetchPostsByGroupIdAndGetLikedByVaultId(
                community.group_id,
                loggedInUser.vault_id
              );
            return communityPosts;
          })
        );
        console.log(posts, "wats wrong with posts?");

        // flatten the array of arrays into a single array of posts
        const allPosts = posts.flat();

        // sort the posts by timestamp in descending order (most recent first)
        const sortedPosts = allPosts.sort((a, b) => b.timestamp - a.timestamp);

        setPosts(sortedPosts);
      };
      fetchAllPostsForAllCommunitiesUserIsAPartOf();
    }
  }, [communities]);

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

export default PostsList;
