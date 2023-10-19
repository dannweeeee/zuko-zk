"use client"

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import PostCard from "../cards/PostCard";

interface UserData {
  username: string;
  vaultId: string;
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData({ username: foundUser.user.username, vaultId: foundUser.user.vault_id });

      // Call the fetchCommunityByVaultId API
      ApiService.fetchCommunityByVaultId(foundUser.user.vault_id)
      .then(response => {
        setGroupId(response.results[0].group_id);
        console.log('GroupID:', response.results[0].group_id);
      })
      .catch(error => {
        console.error('Error fetching communities by vault ID:', error);
      });
    }
  }, []);

  useEffect(() => {
    if (groupId) {
      // Call the fetchPostsByGroupId API
      ApiService.fetchPostsByGroupId(groupId)
        .then(response => {
          setPosts(response);
          console.log('Posts:', response);
        })
        .catch(error => {
          console.error('Error fetching posts by group ID:', error);
        });
    }
  }, [groupId]);

  useEffect(() => {
    if (posts.length > 0) {
      const fetchUsernames = async () => {
        const usernames = await Promise.all(posts.map(post => ApiService.fetchUser(post.vault_id)));
        setUsernames(usernames);
        setLoading(false);
      };
      fetchUsernames();
    }
  }, [posts]);

  return (
    <section className='mt-9 flex flex-col gap-10'>
    {loading ? (
      <p>Loading...</p>
    ) : (
      posts.length > 0 ? (
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
              username={usernames[index] ? usernames[index].username : ''}
            />
          ))}
        </>
      ) : (
        <p className='!text-base-regular text-light-3 no-result'>
            No Posts Currently
        </p>
      )
    )}
  </section>
  )
}

export default PostsList