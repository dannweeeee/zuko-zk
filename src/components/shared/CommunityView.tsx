"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
    communityId: number;
    description: string;
    groupId: string;
    name: string;
  }

function CommunityView({ communityId, description, groupId, name}: Props) {
  const router = useRouter();

  return (
    <article className='user-card'>
      <div className='user-card_avatar flex flex-wrap items-center gap-3'>
        <div className='relative h-12 w-12'>
            <Image
                src='/assets/apecoin-logo.png'
                alt='community_logo'
                fill
                className='rounded-full object-cover'
            />
        </div>

        <div className='flex-1 text-ellipsis'>
            <h4 className='font-semibold text-light-1'>{name}</h4>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
            router.push(`/dashboard/profile/${groupId}`)
          }}
      >
        View
      </Button>
    </article>
  );
}

export default CommunityView;