import CommentsList from '@/components/lists/CommentsList'
import React from 'react'

async function page({
    searchParams,
  }: {
    searchParams: { [key: number]: number | undefined };
  }){
  return (
    <div>
        <CommentsList />
    </div>
  )
}

export default page