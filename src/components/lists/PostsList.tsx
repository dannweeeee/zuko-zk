"use client"

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";

interface PostsByCommunity {
    title: string;
    content: string;
    vaultId: string;
    groupId: string;
}

interface CommunityByUser {
    meta: {
        duration: number;
      };
      success: boolean;
      results: {
        group_id: number;
        user_community_id: number;
        vault_id: string;
      }[];
}

const PostsList = () => {
  return (
    <div>List of Posts</div>
  )
}

export default PostsList