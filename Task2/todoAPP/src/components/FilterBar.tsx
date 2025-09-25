import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setFilter, setSearchQuery, type FilterType } from '@/store/slices/filtersSlice';
import { cn } from '@/lib/utils';

const filterOptions: { value: FilterType; label: string; count?: boolean }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterBar() {
  const dispatch = useAppDispatch();
  const { currentFilter, searchQuery } = useAppSelector((state) => state.filters);
  const { tasks } = useAppSelector((state) => state.tasks);

  const getFilterCount = (filter: FilterType): number => {
    switch (filter) {
      case 'all':
        return tasks.length;
      case 'active':
        return tasks.filter(task => !task.completed).length;
      case 'completed':
        return tasks.filter(task => task.completed).length;
      default:
        return 0;
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Card className="glass-card border-border-hover">
      <CardContent className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 border-none bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {filterOptions.map((option) => {
            const count = getFilterCount(option.value);
            const isActive = currentFilter === option.value;
            
            return (
              <Button
                key={option.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(option.value)}
                className={cn(
                  "relative transition-all duration-200",
                  isActive 
                    ? "btn-gradient shadow-primary" 
                    : "hover:bg-surface-hover hover:border-primary/30"
                )}
              >
                {option.label}
                <span className={cn(
                  "ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium",
                  isActive 
                    ? "bg-white/20 text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {count}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}