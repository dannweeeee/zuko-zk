"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ApiService from "@/ApiService";
import UserCard from "../cards/UserCard";
import CommunityViewCard from "../cards/CommunityViewCard";

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
  }[];
}

function CommunityView() {
  const router = useRouter();
  const [suggestedCommunities, setSuggestedCommunities] = useState<ApiResponse | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          const data = await ApiService.fetchCommunities();
          setSuggestedCommunities(data);
          console.log('Communities Data:', data);
      };
      fetchData(); 
  }, []);

  return (
    <div>
            {suggestedCommunities && suggestedCommunities.results && suggestedCommunities.results.length > 0 ? (
                <>
                    {suggestedCommunities.results.map((result) => (
                        <CommunityViewCard
                            key={result.community_id}
                            groupid={result.group_id}
                            name={result.name}
                        />
                    ))}
                </>
            ) : (
                <p className='!text-base-regular text-light-3'>
                            No Communities Currently
                </p>
            )}
        </div>
  );
}

export default CommunityView;