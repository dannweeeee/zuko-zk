import Post from '@/components/forms/Post';
import { redirect } from 'next/navigation';

async function Page() {

    return (
        <>
          <h1 className='head-text'>Create Post</h1>
    
          <Post userId={""} />
        </>
    );
}

export default Page;