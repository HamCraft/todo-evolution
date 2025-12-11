import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, AlertTriangle, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total Tasks"
        value={stats.total}
        icon={ListTodo}
        className="text-foreground"
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        icon={CheckCircle2}
        className="text-success"
        subtext={`${completionRate}%`}
      />
      <StatCard
        label="Active"
        value={stats.active}
        icon={Circle}
        className="text-primary"
      />
      <StatCard
        label="Overdue"
        value={stats.overdue}
        icon={AlertTriangle}
        className="text-destructive"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  className?: string;
  subtext?: string;
}

function StatCard({ label, value, icon: Icon, className, subtext }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-card">
      <div className="flex items-center justify-between">
        <Icon className={cn('w-5 h-5', className)} />
        {subtext && (
          <span className="text-xs text-muted-foreground">{subtext}</span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
