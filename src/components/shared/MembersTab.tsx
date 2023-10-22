"use client";

import ApiService from "@/ApiService";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";

interface UserData {
  username: string;
  vaultId: string;
}

const MembersTab = ({ group_id }: { group_id: string }) => {
  const [users, setUsers] = useState<UserData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" mt-8">
      {users ? (
        users.map((user) => (
          <UserCard
            key={user.vaultId}
            vaultid={user.vaultId}
            username={user.username}
          />
        ))
      ) : (
        <p className="no-result">No Result</p>
      )}
    </div>
  );
};

export default MembersTab;
