
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          className={activeCategory === null ? "bg-alzheimer-primary hover:bg-alzheimer-accent" : ""}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Button>
        {categories.map((category, index) => (
          <Button 
            key={index}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            className={activeCategory === category ? "bg-alzheimer-primary hover:bg-alzheimer-accent" : ""}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
