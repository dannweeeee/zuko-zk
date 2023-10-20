"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";
import { getCookie } from "@/helper";

interface UserData {
  username: string;
  vaultId: string;
}

interface Community {
  group_id: string;
  user_community_id: number;
  vault_id: string;
}

interface PostsByCommunity {
  post_id: number;
  title: string;
  content: string;
  timestamp: number;
  likes_count: number;
  comments_count: number;
  vault_id: string;
  group_id: string;
}

const PostsList = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostsByCommunity[]>([]);
  const [usernames, setUsernames] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const loggedInUser = getCookie();
    console.log(loggedInUser, "Loggedin user");
    if (loggedInUser) {
      setUserData({
        username: loggedInUser.username,
        vaultId: loggedInUser.vault_id,
      });

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
  }, []);

  useEffect(() => {
    if (communities.length > 0) {
      const fetchPostsForAllCommunities = async () => {
        const posts = await Promise.all(
          communities.map(async (community) => {
            const communityPosts = await ApiService.fetchPostsByGroupId(community.group_id);
            return communityPosts;
          })
        );

        // flatten the array of arrays into a single array of posts
        const allPosts = posts.flat();

        // sort the posts by timestamp in descending order (most recent first)
        const sortedPosts = allPosts.sort((a, b) => b.timestamp - a.timestamp);

        setPosts(sortedPosts);
      };

      fetchPostsForAllCommunities();
    }
  }, [communities]);

  useEffect(() => {
    if (posts.length > 0) {
      const fetchUsernames = async () => {
        const usernames = await Promise.all(
          posts.map((post) => ApiService.fetchUserByVaultId(post.vault_id))
        );
        setUsernames(usernames);
        setLoading(false);
      };
      fetchUsernames();
    }
  }, [posts]);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {loading ? (
        <h1 className="font-semibold text-3xl text-center blue-text-gradient">
          Loading...
        </h1>
      ) : posts.length > 0 ? (
        <>
          {posts.map((post, index) => (
            <PostCard
              key={post.post_id}
              postId={post.post_id}
              title={post.title}
              content={post.content}
              timestamp={post.timestamp}
              likes_count={post.likes_count}
              comments_count={post.comments_count}
              vaultId={post.vault_id}
              groupId={post.group_id}
              username={usernames[index] ? usernames[index].username : ""}
            />
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
