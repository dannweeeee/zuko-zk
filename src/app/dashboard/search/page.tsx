import { redirect } from "next/navigation";

import UserSearchbar from "@/components/shared/UserSearchbar";

async function Page() {

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      <div>
        <UserSearchbar />
      </div>
      <div className='mt-14 flex flex-col gap-9'>
      </div>
    </section>
  );
}

export default Page;