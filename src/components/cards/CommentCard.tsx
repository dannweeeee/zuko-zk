import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    content: string;
    likesCount: number;
    postId: number;
    timestamp: number;
    vaultId: string;
    username: string;
  }
  
  function CommentCard({ content, likesCount, postId, timestamp, vaultId, username }: Props) {
    const formatDateString = (timestamp: number) => {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleString();
    };

  return (
    <article className={`flex w-full flex-col rounded-xl`}>
        <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${vaultId}`} className="relative h-11 w-11">
                        <Image 
                            src={`https://api.multiavatar.com/${username}.png`}
                            alt="Profile Image"
                            fill
                            className="cursor-pointer rounded-full"
                        />
                    </Link>
                    <div className="post-card_bar"/>
                </div>
                <div className="flex w-full flex-col">
                    <Link href={`/profile/${vaultId}`} className="w-fit">
                        <h4 className="cursor-pointer font-semibold text-light-1">{username}</h4>
                    </Link>
                    <p className="mt-2 text-small-regular text-sm text-light-2">{content}</p>
                    <div className={`mt-5 flex flex-col gap-3`}>
                        <div className="flex gap3.5">
                            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p className="mt-2 text-small-regular text-sm text-light-2 font-semibold">
            {formatDateString(timestamp)}
        </p>
    </article>
  )
}

export default CommentCard