export type Priority = 'high' | 'medium' | 'low';

export type Category = 'work' | 'personal' | 'health' | 'shopping';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption = 'dueDate' | 'priority' | 'alphabetical' | 'createdAt';

export type FilterOption = 'all' | 'active' | 'completed';
