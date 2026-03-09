'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import { ITourist } from '@/types/tourist.interface';

export const touristsColumns: Column<ITourist>[] = [
  {
    header: 'Tourist',
    accessor: (tourist) => (
      <UserInfoCell
        name={tourist.name}
        email={tourist.email}
        photo={tourist.profilePicUrl}
      />
    ),
    sortKey: 'name',
  },
  {
    header: 'Contact Info',
    accessor: (tourist) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-foreground/80">{tourist.phone || 'No Phone'}</span>
        <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{tourist.address || 'No Address'}</span>
      </div>
    ),
  },
  {
    header: 'Gender',
    accessor: (tourist) => (
      <span className="text-xs font-black uppercase tracking-[0.1em] text-muted-foreground/80">
        {tourist.gender?.toLowerCase() || 'N/A'}
      </span>
    ),
  },
  {
    header: 'Joined',
    accessor: (tourist) => <DateCell date={tourist.createdAt} />,
    sortKey: 'createdAt',
  },
];
