// components/ProtectedRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = (children: React.ReactNode) => {
  const loggedInUser = localStorage.getItem("currentUser");

  const router = useRouter();
  useEffect(() => {
    const foundUser = loggedInUser ? JSON.parse(loggedInUser) : null;
    if (!foundUser.user.vault_id) {
      router.push("/");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
