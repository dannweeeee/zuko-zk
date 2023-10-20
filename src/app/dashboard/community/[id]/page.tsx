import Image from 'next/image';
import { communityTabs } from '@/constants';

import ProfileHeader from '@/components/shared/ProfileHeader';
import CommunityTab from '@/components/shared/CommunityTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserCard from '@/components/cards/UserCard';
import { useState } from 'react';
import ApiService from '@/ApiService';


async function CommunityDetailsPage({ params }: { params: { id: string }}) {

    return (
        <section>
            <ProfileHeader 
                group_id={params.id}
            />
            <div>
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image 
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === 'Posts' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                        <TabsContent value="posts" className="w-full text-light-1">
                            <CommunityTab />
                        </TabsContent>
                        <TabsContent value="members" className="w-full text-light-1">
                            <CommunityTab />
                        </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default CommunityDetailsPage;