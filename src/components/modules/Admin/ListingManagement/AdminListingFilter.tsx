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
import { cn } from '@/lib/utils';
import { MapPin, Tag, ShieldCheck, Filter } from 'lucide-react';

const AdminListingFilter = () => {
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
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-sm mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Main Search */}
        <div className="flex-1 min-w-[300px]">
          <SearchFilter paramName="searchTerm" placeholder="Search listing title, city or guide name..." />
        </div>
        
        {/* Secondary Filters Group */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-48 group/select">
            <Select 
              onValueChange={handleCategoryChange} 
              defaultValue={searchParams.get('category') || 'all'}
              disabled={isPending}
            >
              <SelectTrigger className="h-10 bg-muted/30 border-border/40 focus:ring-primary/40 rounded-lg transition-all hover:bg-muted/50">
                <div className="flex items-center gap-2 overflow-hidden">
                   <Tag className="h-3.5 w-3.5 text-muted-foreground/60" />
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

          <div className="w-40 group/select">
            <Select 
              onValueChange={handleStatusChange} 
              defaultValue={searchParams.get('active') !== null ? (searchParams.get('active') === 'true' ? 'active' : 'inactive') : 'all'}
              disabled={isPending}
            >
              <SelectTrigger className="h-10 bg-muted/30 border-border/40 focus:ring-primary/40 rounded-lg transition-all hover:bg-muted/50">
                <div className="flex items-center gap-2 overflow-hidden">
                   <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground/60" />
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
        <div className="flex items-center gap-2 border-l border-border/40 pl-4 ml-auto">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
};

export default AdminListingFilter;
