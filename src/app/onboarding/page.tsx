"use client";

import AuthUser from "@/components/shared/AuthUser";
import TypewriterTitle from "@/components/shared/TypewriterTitle";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Onboarding() {
  console.log("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-100 to-teal-100">
      <Link href="/" className="absolute px-6 py-3">
        <Image
          src="/assets/logo-name.png"
          alt="logo"
          width={110}
          height={110}
        />
      </Link>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <AuthUser />
      </div>
    </div>
  );
}
