"use-client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import ApiService from "@/ApiService";

interface AuthUser {
  vaultId: string | null;
  jwt: string | null;
  newUser: string | null;
}

function AuthUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userName, setUserName] = useState("");
  const [success, setSuccess] = useState("");

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setUser({
      vaultId: searchParams.get("vaultId"),
      jwt: searchParams.get("jwt"),
      newUser: searchParams.get("newUser"),
    });
    //Add auth token to cookies
    cookies.set("jwt", searchParams.get("jwt"));
  }, [success]);

  const handleSubmitUsername = async () => {
    if (user) {
      const res = await ApiService.createUser(user.vaultId as string, userName);
      if (res.status === 200) {
        const createdUserResult = await res.json();
        console.log(createdUserResult, "createdUserResult");
        setUser(null); // set user to null again
        setSuccess(
          "You successfully created a user. You can now access your communities"
        );
        router.push("/dashboard");
      }
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
          {success}
        </div>
      ) : null}
    </div>
  );
}

export default AuthUser;
