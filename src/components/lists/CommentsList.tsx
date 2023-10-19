import React from 'react'

interface Comments {
    comment_id: number;
    content: string;
    likes_count: number;
    post_id: number;
    timestamp: number;
    vault_id: string;
}

const CommentsList = () => {
  return (
    <div>CommentsList</div>
  )
}

export default CommentsList