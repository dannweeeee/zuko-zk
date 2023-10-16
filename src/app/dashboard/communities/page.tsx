import { redirect } from "next/navigation";

import CommunitySearchbar from "@/components/shared/CommunitySearchbar";

async function Page() {

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-10'>
        <CommunitySearchbar />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        
      </section>
    </>
  );
}

export default Page;