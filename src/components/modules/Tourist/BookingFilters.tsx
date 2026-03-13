'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCw, Search, X, Filter } from 'lucide-react';
import { getBookingGuides, getBookingCities } from '@/services/tourist/booking';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REJECTED', label: 'Rejected' },
];

const SORT_OPTIONS = [
  { value: 'desc', label: 'Newest First' },
  { value: 'asc', label: 'Oldest First' },
];

interface Guide {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicUrl: string | null;
    email: string;
    phone: string;
  };
}

export default function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [search, setSearch] = useState(searchParams.get('searchTerm') || '');
  const [guide, setGuide] = useState(searchParams.get('guideId') || 'all');
  const [city, setCity] = useState(searchParams.get('city') || 'all');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');

  const [guides, setGuides] = useState<Guide[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  const hasActiveFilters = useMemo(() => {
    return status !== 'all' || search !== '' || guide !== 'all' || city !== 'all' || sortOrder !== 'desc';
  }, [status, search, guide, city, sortOrder]);

  useEffect(() => {
    const fetchFilters = async () => {
      setLoadingFilters(true);
      try {
        const [guidesResult, citiesResult] = await Promise.all([
          getBookingGuides(),
          getBookingCities(),
        ]);

        if (guidesResult?.success) {
          setGuides(guidesResult.data || []);
        }
        if (citiesResult?.success) {
          setCities(citiesResult.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilters();
  }, []);

  const clearAllFilters = useCallback(() => {
    setStatus('all');
    setSearch('');
    setGuide('all');
    setCity('all');
    setSortOrder('desc');
    
    startTransition(() => {
      router.push('/dashboard/my-booking');
    });
  }, [router]);

  const updateParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    params.set('page', '1');
    
    startTransition(() => {
      router.push(`/dashboard/my-booking?${params.toString()}`);
    });
  }, [searchParams, router]);

  useEffect(() => {
    if (debouncedSearch) {
      updateParams({ searchTerm: debouncedSearch });
    } else if (searchParams.get('searchTerm')) {
      updateParams({ searchTerm: '' });
    }
  }, [debouncedSearch, updateParams, searchParams]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    updateParams({ status: value });
  };

  const handleGuideChange = (value: string) => {
    setGuide(value);
    updateParams({ guideId: value });
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    updateParams({ city: value });
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    updateParams({ sortOrder: value });
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-destructive h-auto p-1.5"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Clear All</span>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by tour title..."
            className="pl-10 bg-background/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-44">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <Select 
            value={guide} 
            onValueChange={handleGuideChange}
            disabled={loadingFilters}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder={loadingFilters ? "Loading..." : "Guide"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Guides</SelectItem>
              {guides.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <Select 
            value={city} 
            onValueChange={handleCityChange}
            disabled={loadingFilters}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder={loadingFilters ? "Loading..." : "City"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-44">
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isPending}
          className="gap-2 bg-background/50"
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </div>
  );
}