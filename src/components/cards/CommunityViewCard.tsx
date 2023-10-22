"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  groupid: string;
  name: string;
}

function CommunityViewCard({ groupid, name }: Props) {
  const router = useRouter();

  return (
    <article className='community-view-card mt-2 gap-10'>
      <Link href={`/dashboard/community/${groupid}`} className="cursor-pointer">
        <div className='community-view-card_avatar flex flex-wrap items-center gap-3'>
          <div className='relative h-12 w-12'>
            <Image
              src='/assets/apecoin-logo.png'
              alt='user_logo'
              fill
              className='rounded-full object-cover'
            />
          </div>
          <div className='flex-1 text-ellipsis'>
            <h4 className='font-semibold text-light-1'>{name}</h4>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default CommunityViewCard;