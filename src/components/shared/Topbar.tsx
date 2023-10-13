"use client"

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

function Topbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo-name.png" alt="logo" width={110} height={110} />
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                </div>
            </div>

            <div>
                <div className="flex items-center gap-4 flex-col">
                    <Button className="gap-5" onClick={() => setIsOpen((prev) => !prev)}>
                        <Image src={`https://api.multiavatar.com/finesto.png`} alt="profile-picture" width={35} height={35} />
                        Profile
                        {!isOpen ? (
                            <AiOutlineCaretDown className="h-8" />
                        ) : (
                            <AiOutlineCaretUp className="h-8" />
                        )}
                    </Button>

                    {isOpen && (
                        <div className="bg-cyan-500 absolute top-20 flex flex-col items-start rounded-lg p-3">
                            <Link href="/" className="w-full gap-4 flex text-white">
                                Logout
                                <Image src="/assets/logout.svg" alt="logout" width={20} height={20} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Topbar;