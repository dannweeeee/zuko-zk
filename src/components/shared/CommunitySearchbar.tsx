"use client";

import ApiService from "@/ApiService";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function CommunitySearchbar() {
  const [vaultId, setVaultId] = useState('');
  const [communityData, setCommunityData] = useState(null);

  const handleCommunitySearch = async () => {
    const data = await ApiService.fetchCommunity(vaultId);
    setCommunityData(data);
    console.log('Community Data:', data);
  };

  return (
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
        value={vaultId}
        onChange={(e) => setVaultId(e.target.value)}
        placeholder={"Input VaultId..."}
        className="no-focus searchbar_input"
      />
     <Button className="gap-5" onClick={handleCommunitySearch}>
            Search
      </Button>
    </div>
  );
}

export default CommunitySearchbar;