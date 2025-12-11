import { Category } from '@/types/todo';
import { cn } from '@/lib/utils';
import { Briefcase, User, Heart, ShoppingCart } from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

const categoryConfig: Record<Category, { label: string; className: string; icon: React.ElementType }> = {
  work: {
    label: 'Work',
    className: 'bg-category-work/10 text-category-work',
    icon: Briefcase,
  },
  personal: {
    label: 'Personal',
    className: 'bg-category-personal/10 text-category-personal',
    icon: User,
  },
  health: {
    label: 'Health',
    className: 'bg-category-health/10 text-category-health',
    icon: Heart,
  },
  shopping: {
    label: 'Shopping',
    className: 'bg-category-shopping/10 text-category-shopping',
    icon: ShoppingCart,
  },
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full',
        config.className,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
