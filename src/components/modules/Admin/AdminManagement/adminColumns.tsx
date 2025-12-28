'use client';

import { DateCell } from '@/components/shared/cell/DateCell';
import { UserInfoCell } from '@/components/shared/cell/UserInfoCell';
import { Column } from '@/components/shared/ManagementTable';
import { IAdmin } from '@/types/admin.interface';

export const adminColumns: Column<IAdmin>[] = [
  {
    header: 'Admins',
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePicUrl}
      />
    ),
    sortKey: 'name',
  },
  // {
  //   header: 'Contact',
  //   accessor: (tourist) => (
  //     <div className="flex flex-col">
  //       <span className="text-sm">{tourist.contactNumber}</span>
  //     </div>
  //   ),
  // },
  // {
  //   header: 'Address',
  //   accessor: (tourist) => (
  //     <span className="text-sm">{tourist.address || 'N/A'}</span>
  //   ),
  // },
  // {
  //   header: 'Gender',
  //   accessor: (tourist) => (
  //     <span className="text-sm capitalize">
  //       {tourist.touristHealthData?.gender?.toLowerCase() || 'N/A'}
  //     </span>
  //   ),
  // },
  // {
  //   header: 'Status',
  //   accessor: (tourist) => <StatusBadgeCell isDeleted={tourist.isDeleted} />,
  // },
  {
    header: 'Joined',
    accessor: (admin) => <DateCell date={admin.createdAt} />,
    sortKey: 'createdAt',
  },
];
