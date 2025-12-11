import { useState } from 'react';
import { Task } from '@/types/todo';
import { cn } from '@/lib/utils';
import { PriorityBadge } from './PriorityBadge';
import { CategoryBadge } from './CategoryBadge';
import { Check, Trash2, Pencil, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => {
      onToggleComplete(task.id);
      setIsChecking(false);
    }, 300);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 200);
  };

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;

  return (
    <div
      className={cn(
        'group bg-card rounded-lg border border-border p-4 transition-all duration-200',
        'hover:shadow-card-hover hover:border-primary/20',
        isDeleting && 'animate-fade-out',
        task.completed && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={cn(
            'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200',
            'flex items-center justify-center',
            task.completed
              ? 'bg-success border-success'
              : 'border-muted-foreground/40 hover:border-primary',
            isChecking && 'animate-check-bounce'
          )}
        >
          {task.completed && <Check className="w-3 h-3 text-success-foreground" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium text-foreground transition-all duration-200',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>

            {/* Actions - visible on hover */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(task)}
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <PriorityBadge priority={task.priority} />
            <CategoryBadge category={task.category} />

            {task.dueDate && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs',
                  isOverdue ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                <Calendar className="w-3 h-3" />
                {formatDueDate(new Date(task.dueDate))}
              </span>
            )}
          </div>

          {/* Description toggle */}
          {task.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Hide details
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  Show details
                </>
              )}
            </button>
          )}

          {/* Expanded description */}
          {isExpanded && task.description && (
            <p className="mt-2 text-sm text-muted-foreground animate-slide-in">
              {task.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
