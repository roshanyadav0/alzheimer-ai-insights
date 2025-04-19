
import { Loader2 } from 'lucide-react';

const NewsLoadingState = () => {
  return (
    <div className="py-16 bg-white">
      <div className="section-container">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-alzheimer-primary mx-auto" />
            <p className="mt-4 text-lg text-gray-600">Loading latest news...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLoadingState;
