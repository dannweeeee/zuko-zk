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
    <article className='community-card'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/communities/${groupId}`} className='relative h-12 w-12'>
          <Image
            src='/assets/apecoin-logo.png'
            alt='community_logo'
            fill
            className='rounded-full object-cover'
          />
        </Link>

        <div>
          <Link href={`/communities/${groupId}`}>
            <h4 className='font-semibold text-light-1'>{name}</h4>
          </Link>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{description}</p>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <Link href={`/communities/${groupId}`}>
          <Button size='sm' className='community-card_btn'>
            View
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default CommunityCard;