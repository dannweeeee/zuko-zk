"use-client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AuthUser {
  vaultId: string | null;
  jwt: string | null;
  newUser: string | null;
}

function AuthUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUser({
      vaultId: searchParams.get("vaultId"),
      jwt: searchParams.get("jwt"),
      newUser: searchParams.get("newUser"),
    });
  }, []);

  const handleSubmitUsername = async () => {
    const res = await fetch("http://localhost:3050/v1/user", {
      method: "POST",
      body: JSON.stringify({ vault_id: user?.vaultId, username: userName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      console.log(res, "wats res?");
    }
  };

  console.log(user, "what is user state? BRÄ");

  return (
    <div>
      {user?.newUser === "true" ? (
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to Zuko!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Choose your username and embrace complete anonymity in this forum,
            powered by the magic of ZK!
          </p>

          <Input
            id="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"Input username..."}
            className="no-focus searchbar_input"
          />
          <br></br>
          <Button className="gap-5" onClick={handleSubmitUsername}>
            Submit
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default AuthUser;
