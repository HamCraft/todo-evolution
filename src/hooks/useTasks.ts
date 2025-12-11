import { useState, useMemo } from 'react';
import { Task, Priority, Category, SortOption, FilterOption } from '@/types/todo';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'Review project proposal',
    description: 'Go through the Q1 project proposal and add comments',
    completed: false,
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Morning workout',
    description: '30 minutes cardio + stretching',
    completed: true,
    priority: 'medium',
    category: 'health',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables',
    completed: false,
    priority: 'low',
    category: 'shopping',
    dueDate: new Date(Date.now() + 172800000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Call mom',
    completed: false,
    priority: 'medium',
    category: 'personal',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter((task) =>
        filterStatus === 'completed' ? task.completed : !task.completed
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter((task) => task.category === filterCategory);
    }

    // Priority filter
    if (filterPriority !== 'all') {
      result = result.filter((task) => task.priority === filterPriority);
    }

    // Sorting
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

    result.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [tasks, searchQuery, filterStatus, filterCategory, filterPriority, sortBy]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, active, overdue };
  }, [tasks]);

  return {
    tasks: filteredAndSortedTasks,
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
  };
}
