
export interface Topic {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  category: 'research' | 'discussion' | 'support' | 'news';
  created_at: string;
  last_activity: string;
  replies_count: number;
  views_count: number;
}

export interface Reply {
  id: string;
  topic_id: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
}
