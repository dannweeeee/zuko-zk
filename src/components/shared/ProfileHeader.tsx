"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ApiService from "@/ApiService";
import ProfileSkeletonLoading from "../ui/ProfileSkeletonLoading";

interface Props {
  group_id: string;
}

interface CommunityDetails {
  meta: {
    duration: number;
  };
  success: boolean;
  results: {
    community_id: number;
    description: string;
    group_id: string;
    name: string;
    picture_url: string;
  }[];
}

function ProfileHeader({ group_id }: Props) {
  const [groupId, setGroupId] = useState("");
  const [communityData, setCommunityData] = useState<CommunityDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true); // Set default loading to true

  const handleCommunitySearch = async () => {
    try {
      setLoading(true);
      const data = await ApiService.fetchCommunityByGroupId(group_id);
      setCommunityData(data);
    } catch (error) {
      console.error("Error fetching community data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCommunitySearch();
  }, [group_id]);

  return (
    <div className="flex w-full flex-col justify-start">
      {loading ? (
        <ProfileSkeletonLoading />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={communityData?.results[0].picture_url || ""}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <p className="font-bold">@{communityData?.results[0].name}</p>
            </div>
          </div>
        </div>
      )}
      <p className="mt-6 max-w-lg font-semibold">
        {communityData?.results[0].description}
      </p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
