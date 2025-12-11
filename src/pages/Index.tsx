import { useState } from 'react';
import { Task } from '@/types/todo';
import { useTasks } from '@/hooks/useTasks';
import { TaskItem } from '@/components/todo/TaskItem';
import { TaskForm } from '@/components/todo/TaskForm';
import { TaskFilters } from '@/components/todo/TaskFilters';
import { TaskStats } from '@/components/todo/TaskStats';
import { EmptyState } from '@/components/todo/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const {
    tasks,
    stats,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const hasFilters = searchQuery !== '' || filterStatus !== 'all' || filterCategory !== 'all' || filterPriority !== 'all';

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(task);
    toast({
      title: 'Task created',
      description: 'Your new task has been added successfully.',
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast({
        title: 'Task updated',
        description: 'Your changes have been saved.',
      });
      setEditingTask(null);
    } else {
      handleAddTask(taskData);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: 'Task deleted',
      description: 'The task has been removed.',
      variant: 'destructive',
    });
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    toggleComplete(id);
    if (task && !task.completed) {
      toast({
        title: 'Well done!',
        description: 'Task marked as complete.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                <CheckSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">Stay organized, get things done</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingTask(null);
                setFormOpen(true);
              }}
              className="gap-2 shadow-card"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <section className="mb-8">
          <TaskStats stats={stats} />
        </section>

        {/* Filters */}
        <section className="mb-6">
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterCategory={filterCategory}
            onFilterCategoryChange={setFilterCategory}
            filterPriority={filterPriority}
            onFilterPriorityChange={setFilterPriority}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </section>

        {/* Task List */}
        <section>
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasFilters={hasFilters}
              onAddTask={() => {
                setEditingTask(null);
                setFormOpen(true);
              }}
            />
          )}
        </section>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSubmit={handleUpdateTask}
        editTask={editingTask}
      />
    </div>
  );
};

export default Index;
