"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import CommunityCard from "../cards/CommunityCard";

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

const CommunityList = () => {
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
                        <CommunityCard
                            key={result.community_id}
                            communityId={result.community_id}
                            description={result.description}
                            groupId={result.group_id}
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

export default CommunityList