'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface BookingStats {
  totalBookings: number;
  upcomingBookings: number;
  pastBookings: number;
  totalSpent: number;
  statusCounts: Record<string, number>;
}

interface BookingStatsPageProps {
  stats: BookingStats;
}

const BookingStats: React.FC<BookingStatsPageProps> = ({ stats }) => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Booking Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Total Bookings</p>
            <p className="text-2xl font-semibold">{stats.totalBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Upcoming Bookings</p>
            <p className="text-2xl font-semibold">{stats.upcomingBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Past Bookings</p>
            <p className="text-2xl font-semibold">{stats.pastBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Total Spent</p>
            <p className="text-2xl font-semibold">৳ {stats.totalSpent}</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Status Breakdown */}
      <Card>
        <CardContent>
          <p className="text-gray-500 mb-3 font-medium">Booking Status</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.statusCounts).map(([status, count]) => (
              <Badge key={status} className="text-white bg-blue-500">
                {status}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStats;
