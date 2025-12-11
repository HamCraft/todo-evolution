import { Priority } from '@/types/todo';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: {
    label: 'High',
    className: 'bg-priority-high/10 text-priority-high border-priority-high/20',
  },
  medium: {
    label: 'Medium',
    className: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  },
  low: {
    label: 'Low',
    className: 'bg-priority-low/10 text-priority-low border-priority-low/20',
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
