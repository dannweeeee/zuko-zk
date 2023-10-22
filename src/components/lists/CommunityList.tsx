"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import CommunityCard from "../cards/CommunityCard";
import SkeletonLoading from "../ui/SkeletonLoading";

interface ApiResponse {
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

const CommunityList = () => {
  const [suggestedCommunities, setSuggestedCommunities] =
    useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.fetchCommunities();
        setSuggestedCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <SkeletonLoading />
      ) : suggestedCommunities &&
        suggestedCommunities.results &&
        suggestedCommunities.results.length > 0 ? (
        <>
          {suggestedCommunities.results.map((result) => (
            <CommunityCard
              key={result.community_id}
              communityId={result.community_id}
              description={result.description}
              groupId={result.group_id}
              picture={result.picture_url}
              name={result.name}
            />
          ))}
        </>
      ) : (
        <p className="text-base-regular text-light-3 no-result font-semibold">
          No Communities Currently
        </p>
      )}
    </div>
  );
};

export default CommunityList;
