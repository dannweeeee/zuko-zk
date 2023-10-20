import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
    postId: number;
    title: string;
    content: string;
    timestamp: number;
    likes_count: number;
    comments_count: number;
    vaultId: string;
    groupId: string;
    username: string;
}

const PostCard = ({
    postId,
    title,
    content,
    timestamp,
    likes_count,
    comments_count,
    vaultId,
    groupId,
    username
}: Props) => {
    const formatDateString = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Adjust the format as needed
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
                    <div className="thread-card_bar"/>
                </div>
                <div className="flex w-full flex-col">
                    <Link href={`/profile/${vaultId}`} className="w-fit">
                        <h4 className="cursor-pointer font-semibold text-light-1">{username}</h4>
                    </Link>
                    <h1 className="mt-2 font-bold text-xl text-light-2">{title}</h1>
                    <p className="mt-2 text-small-regular text-sm text-light-2">{content}</p>
                    <div className={`mt-5 flex flex-col gap-3`}>
                        <div className="flex gap3.5">
                            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Link href={`/post/${postId}`}>
                                <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain"/>
                            </Link>
                            <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                            <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p className="mt-2 text-small-regular text-sm text-light-2 font-semibold">
            {formatDateString(timestamp)}
            {" "} | {" "} 
            GroupID: {groupId}
        </p>
    </article>
    )
}

export default PostCard;