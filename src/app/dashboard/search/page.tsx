import { redirect } from "next/navigation";

import UserSearchbar from "@/components/shared/UserSearchbar";

async function Page() {

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      <div className='mt-10'>
        <UserSearchbar />
      </div>
    </section>
  );
}

export default Page;