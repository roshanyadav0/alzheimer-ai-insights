
export interface Topic {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: 'research' | 'discussion' | 'support' | 'news';
  createdAt: string;
  lastActivity: string;
  replies: number;
  views: number;
}

export interface Post {
  id: string;
  topicId: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  isAnswer?: boolean;
}
