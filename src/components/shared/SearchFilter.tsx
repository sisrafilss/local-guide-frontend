'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

const SearchFilter = ({
  placeholder = 'Search...',
  paramName = 'searchTerm',
}: SearchFilterProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) || '');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const initialValue = searchParams.get(paramName) || '';

    if (debouncedValue === initialValue) {
      return;
    }

    if (debouncedValue) {
      params.set(paramName, debouncedValue); // ?searchTerm=debouncedValue
      params.set('page', '1'); // reset to first page on search
    } else {
      params.delete(paramName); // remove searchTerm param
      params.delete('page'); // reset to first page on search clear
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, paramName, router]);

  return (
    <div className="relative group/search">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {isPending ? (
          <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        ) : (
          <Search className={cn(
            "h-4 w-4 transition-colors duration-200",
            value ? "text-primary" : "text-muted-foreground/60 group-focus-within/search:text-primary"
          )} />
        )}
      </div>
      <Input
        placeholder={placeholder}
        className="pl-10 h-10 bg-muted/30 border-border/40 focus-visible:ring-primary/40 focus-visible:bg-background transition-all font-medium rounded-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
