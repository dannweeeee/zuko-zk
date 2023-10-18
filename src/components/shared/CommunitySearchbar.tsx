"use client";

import ApiService from "@/ApiService";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CommunityCard from "../cards/CommunityCard";
import CommunityList from "../lists/CommunityList";

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

function CommunitySearchbar() {
  const [groupId, setGroupId] = useState('');
  const [communityData, setCommunityData] = useState<ApiResponse | null>(null);

  const handleCommunitySearch = async () => {
    const data = await ApiService.fetchCommunity(groupId);
    setCommunityData(data);
    console.log('Community Data:', data);
  };

  return (
    <div>
      <div className='searchbar'>
        <Image
          src='/assets/search-gray.svg'
          alt='search'
          width={24}
          height={24}
          className='object-contain'
        />
        <Input
          id="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          placeholder={"Input groupId..."}
          className="no-focus searchbar_input"
        />
        <Button className="gap-5" onClick={handleCommunitySearch}>
              Search
        </Button> 
      </div>
      <div className='mt-5 flex flex-col gap-9 rounded-lg p-5'>
      {communityData ? (
          communityData.results.map((result) => (
            <CommunityCard
              key={result.community_id}
              communityId={result.community_id}
              description={result.description}
              groupId={result.group_id}
              name={result.name}
            />
          ))
        ) : (
          <div>
            <CommunityList />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitySearchbar;