'use client';

import ClearFiltersButton from '@/components/shared/ClearFiltersButton';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ListingCategory } from '@/types/listing.interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Tag, Filter } from 'lucide-react';

const ListingFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== 'all') {
      params.set('active', value === 'active' ? 'true' : 'false');
    } else {
      params.delete('active');
    }
    params.set('page', '1');
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== 'all') {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-sm mb-6 flex-1">
      <div className="flex flex-wrap items-center gap-4">
        {/* Main Search */}
        <div className="flex-1 min-w-[280px]">
          <SearchFilter paramName="searchTerm" placeholder="Search Listings..." />
        </div>
        
        {/* Secondary Filters Group */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-44">
            <Select 
              onValueChange={handleCategoryChange} 
              defaultValue={searchParams.get('category') || 'all'}
              disabled={isPending}
            >
              <SelectTrigger className="h-10 bg-muted/30 border-border/40 focus:ring-primary/40 rounded-xl transition-all hover:bg-muted/50">
                <div className="flex items-center gap-2 overflow-hidden px-1 text-sm font-medium">
                   <Tag className="h-3.5 w-3.5 text-primary/60" />
                   <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/40 shadow-xl">
                <SelectItem value="all" className="font-medium">All Categories</SelectItem>
                {Object.values(ListingCategory).map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize font-medium">
                    {cat.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-36">
            <Select 
              onValueChange={handleStatusChange} 
              defaultValue={searchParams.get('active') !== null ? (searchParams.get('active') === 'true' ? 'active' : 'inactive') : 'all'}
              disabled={isPending}
            >
              <SelectTrigger className="h-10 bg-muted/30 border-border/40 focus:ring-primary/40 rounded-xl transition-all hover:bg-muted/50">
                <div className="flex items-center gap-2 overflow-hidden px-1 text-sm font-medium">
                   <Filter className="h-3.5 w-3.5 text-emerald-500/60" />
                   <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/40 shadow-xl">
                <SelectItem value="all" className="font-medium">All Status</SelectItem>
                <SelectItem value="active" className="font-medium text-emerald-600 focus:text-emerald-600">Active Only</SelectItem>
                <SelectItem value="inactive" className="font-medium text-destructive focus:text-destructive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2 pl-4 ml-auto border-l border-border/20">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
};

export default ListingFilter;
