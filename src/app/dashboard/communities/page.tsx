import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";

async function Page() {

  return (
    <>
      <h1 className='head-text'>Communities</h1>

      <div className='mt-10'>
        <Searchbar />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        
      </section>
    </>
  );
}

export default Page;