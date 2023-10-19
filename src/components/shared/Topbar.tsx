"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  vaultId: string;
}

function Topbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserData({ username: foundUser.user.username, vaultId: foundUser.user.vault_id });
    }
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    setUserData(null);
    router.push('/');
  };

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/assets/logo-name.png"
          alt="logo"
          width={110}
          height={110}
        />
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden"></div>
      </div>

      <div>
        <div className="flex items-center gap-4 flex-col">
          <Button className="gap-5" onClick={() => setIsOpen((prev) => !prev)}>
            <Image
              src={`https://api.multiavatar.com/${userData?.username}.png`}
              alt="profile-picture"
              width={35}
              height={35}
            />
            {userData?.username}
            {!isOpen ? (
              <AiOutlineCaretDown className="h-8" />
            ) : (
              <AiOutlineCaretUp className="h-8" />
            )}
          </Button>

          {isOpen && (
            <div className="absolute mt-8 flex flex-col items-start rounded-lg p-3">
              <Button className="w-full gap-4 flex text-white" onClick={logOutUser}>
                Logout
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
