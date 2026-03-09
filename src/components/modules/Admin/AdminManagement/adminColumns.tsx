'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import { IAdmin } from '@/types/admin.interface';

export const adminColumns: Column<IAdmin>[] = [
  {
    header: 'Admin',
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePicUrl}
      />
    ),
    sortKey: 'name',
  },
  {
    header: 'Contact Info',
    accessor: (admin) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-foreground/80">{admin.contactNumber || 'No Phone'}</span>
      </div>
    ),
  },
  {
    header: 'Joined',
    accessor: (admin) => <DateCell date={admin.createdAt} />,
    sortKey: 'createdAt',
  },
];
