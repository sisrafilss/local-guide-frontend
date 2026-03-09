'use client';

import ClearFiltersButton from '@/components/shared/ClearFiltersButton';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';

const GuideFilter = () => {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm shadow-sm mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Main Search */}
        <div className="flex-1 min-w-[280px]">
          <SearchFilter paramName="searchTerm" placeholder="Search guides by name, location or ID..." />
        </div>
        
        {/* Secondary Filters Group */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-48">
            <SearchFilter paramName="email" placeholder="Filter by email" />
          </div>
          <div className="w-48">
            <SearchFilter paramName="contactNumber" placeholder="Filter by contact" />
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

export default GuideFilter;
