import { getCookie } from "@/helper";
import { useState, useEffect } from "react";
interface UserData {
  username: string;
  vault_id: string;
}

export function useGetLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserFromCookie = async () => {
      try {
        if (!loggedInUser) {
          setLoading(true);
          const _loggedInUser = getCookie();
          setLoggedInUser(_loggedInUser);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching my groups");
      }
    };
    fetchUserFromCookie();
  }, [loggedInUser]);

  return { loggedInUser, loading };
}

export default useGetLoggedInUser;
