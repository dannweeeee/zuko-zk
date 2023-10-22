"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { clearCookie, getCookie } from "@/helper";

interface UserData {
  username: string;
  vaultId: string;
}

function Topbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loggedInUser = getCookie();
    if (loggedInUser) {
      setUserData({
        username: loggedInUser.username,
        vaultId: loggedInUser.vault_id,
      });
    }
  }, []);

  const logOutUser = async () => {
    await clearCookie();
    setUserData(null);
    router.push("/");
  };

  return (
    <nav className="topbar px-5 py-5">
      <Link href="/" className="absolute">
            <Image
              src="/assets/zuko-logo-white-nobg.png"
              alt="logo"
              width={165}
              height={165}
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
              <Button className="gap-5 flex text-black" onClick={logOutUser}>
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
