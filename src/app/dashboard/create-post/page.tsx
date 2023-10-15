import PostPost from '@/components/forms/PostPost';
import { redirect } from 'next/navigation';

async function Page() {

    return (
        <>
          <h1 className='head-text'>Create Post</h1>
    
          <PostPost userId={""} />
        </>
    );
}

export default Page;