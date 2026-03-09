'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import { IGuide } from '@/types/guide.interface';

export const guideColumns: Column<IGuide>[] = [
  {
    header: 'Guide',
    accessor: (guide) => (
      <UserInfoCell
        name={guide.name}
        email={guide.email}
        photo={guide.profilePicUrl}
      />
    ),
    sortKey: 'name',
  },
  {
    header: 'Expertise',
    accessor: (guide) => (
      <div className="flex flex-wrap gap-1">
        {guide.expertise?.slice(0, 2).map((skill, idx) => (
           <span key={idx} className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{skill}</span>
        ))}
        {(guide.expertise?.length || 0) > 2 && (
          <span className="text-[10px] text-muted-foreground font-bold">+{guide.expertise!.length - 2}</span>
        )}
      </div>
    ),
  },
  {
    header: 'Contact Info',
    accessor: (guide) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-foreground/80">{guide.phone || 'No Phone'}</span>
        <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{guide.address || 'No Address'}</span>
      </div>
    ),
  },
  {
    header: 'Joined',
    accessor: (guide) => <DateCell date={guide.createdAt} />,
    sortKey: 'createdAt',
  },
];
