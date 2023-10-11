"use client"

import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
   <div className="bg-gradient-to-r min-h-screen from-blue-100 to-teal-100">
      <Link href="/" className="absolute px-6 py-3">
        <Image src="/assets/logo-name.png" alt="logo" width={110} height={110} />
      </Link>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center blue-text-gradient">
          Zuko
        </h1>
        <div className="mt-4"></div>

        <h2 className="font-semibold text-5xl text-center">
          ZK
          <span className="purple-text-gradient font-bold">
            -Exclusive-
          </span>
          Community
        </h2>
        <div className="mt-4"></div>
        <h3 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h3>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href='/dashboard/'>
            <Button className="font-semibold bg-blue-600">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3}/>
            </Button>
          </Link>
        </div>
      </div>
   </div>
  )
}