import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  communityId: number;
  description: string;
  groupId: string;
  name: string;
}

function CommunityCard({ communityId, description, groupId, name}: Props) {
  return (
    <article className='user-card hover:bg-primary/5 p-5 rounded-lg cursor-pointer'>
      <Link href={`/dashboard/community/${groupId}`}>
      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative h-12 w-12'>
          <Image
            src='/assets/apecoin-logo.png'
            alt='community_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div>
          <h4 className='font-semibold text-light-1'>{name}</h4>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{description}</p>
      </Link>
    </article>
  );
}

export default CommunityCard;