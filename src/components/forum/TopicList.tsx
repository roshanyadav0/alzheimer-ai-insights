
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Topic } from '@/types/forum';
import { MessageSquare, User, Eye } from 'lucide-react';
import { TopicReplies } from './TopicReplies';

interface TopicListProps {
  topics: Topic[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  if (topics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No topics found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Topic</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-center">Replies</TableHead>
              <TableHead className="text-center hidden md:table-cell">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic) => (
              <React.Fragment key={topic.id}>
                <TableRow 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                >
                  <TableCell>
                    <div>
                      <h3 className="font-medium text-alzheimer-primary hover:text-alzheimer-accent transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mt-1 hidden sm:block">
                        {topic.content.substring(0, 100)}...
                      </p>
                      <div className="mt-2 text-xs text-gray-400 md:hidden">
                        {formatDate(topic.created_at)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm">{topic.author_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-500">
                    {formatDate(topic.created_at)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <MessageSquare size={14} className="text-gray-400" />
                      <span className="text-sm">{topic.replies_count}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <Eye size={14} className="text-gray-400" />
                      <span className="text-sm">{topic.views_count}</span>
                    </div>
                  </TableCell>
                </TableRow>
                {selectedTopic === topic.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-4">
                      <Card className="p-4">
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
                          <p className="text-gray-700 whitespace-pre-wrap">{topic.content}</p>
                        </div>
                        <TopicReplies topicId={topic.id} />
                      </Card>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopicList;
