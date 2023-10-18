import PostsList from '@/components/lists/PostsList'

const page = () => {
  return (
    <>
        <h1 className='head-text text-left'>Home</h1>
        <section className='mt-9 flex flex-col gap-10'>
          <PostsList />
        </section>
    </>
  )
}

export default page