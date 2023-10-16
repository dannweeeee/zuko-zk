"use client";

import ApiService from "@/ApiService";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface UserData {
    username: string;
    vaultId: string;
  }

function UserSearchBar() {
  const [vaultId, setVaultId] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUserSearch = async () => {
    const data = await ApiService.fetchUser(vaultId);
    setUserData(data);
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
     <Button className="gap-5" onClick={handleUserSearch}>
            Search
      </Button>
    </div>
  );
}

export default UserSearchBar;