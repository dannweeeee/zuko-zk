export interface Post {
    comments_count: number;
    content: string;
    group_id: string;
    hasLiked: number;
    likes_count: number;
    post_id: number;
    timestamp: number;
    title: string;
    username: string;
    vault_id: string;
    community_name: string;
}

export interface Comment {
    comment_id: number;
    content: string;
    likes_count: null | number;
    post_id: number;
    timestamp: number;
    username: string;
    vault_id: string;
    hasLiked: number;
}