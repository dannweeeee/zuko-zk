import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";

async function Page() {

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      <div>
        <Searchbar />
      </div>
      <div className='mt-14 flex flex-col gap-9'>
      </div>
    </section>
  );
}

export default Page;