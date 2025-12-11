import { ClipboardList, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasFilters: boolean;
  onAddTask: () => void;
}

export function EmptyState({ hasFilters, onAddTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-muted-foreground" />
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No tasks match your filters
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No tasks yet
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Start organizing your day by adding your first task.
          </p>
          <Button onClick={onAddTask} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Your First Task
          </Button>
        </>
      )}
    </div>
  );
}
