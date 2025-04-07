
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Topic } from '@/types/forum';
import { MessageSquare, User, Eye } from 'lucide-react';

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
  if (topics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No topics found</p>
      </div>
    );
  }

  return (
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
            <TableRow key={topic.id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <h3 className="font-medium text-alzheimer-primary hover:text-alzheimer-accent transition-colors cursor-pointer">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate mt-1 hidden sm:block">{topic.content.substring(0, 100)}...</p>
                  <div className="mt-2 text-xs text-gray-400 md:hidden">
                    {formatDate(topic.createdAt)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  <span className="text-sm">{topic.author}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-gray-500">
                {formatDate(topic.createdAt)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <MessageSquare size={14} className="text-gray-400" />
                  <span className="text-sm">{topic.replies}</span>
                </div>
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                <div className="flex items-center justify-center gap-1">
                  <Eye size={14} className="text-gray-400" />
                  <span className="text-sm">{topic.views}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopicList;
