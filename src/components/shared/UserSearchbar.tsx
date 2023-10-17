"use client";

import ApiService from "@/ApiService";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserCard from "../cards/UserCard";
import UserList from "./UserList";

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
    console.log('User Data:', data);
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
          value={vaultId}
          onChange={(e) => setVaultId(e.target.value)}
          placeholder={"Input vaultId..."}
          className="no-focus searchbar_input"
        />
        <Button className="gap-5" onClick={handleUserSearch}>
              Search
        </Button>
      </div>
      <div className='mt-5 flex flex-col gap-9rounded-lg p-5'>
        { userData ? (
            <>
              <UserCard
                key={userData.vaultId}
                vaultid={userData.vaultId}
                username={userData.username}
              />
            </>
          ) : (
            <div>
              <UserList />
            </div>
          )}
      </div>
    </div>
  );
}

export default UserSearchBar;