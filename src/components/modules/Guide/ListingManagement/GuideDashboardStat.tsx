'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface RecentBooking {
  id: string;
  touristName: string;
  listingTitle: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  status: string;
}

interface GuideDashboardStatsProps {
  data: {
    totalBookings: number;
    completedBookings: number;
    recentBookings: RecentBooking[];
  };
}

const GuideDashboardStats: React.FC<GuideDashboardStatsProps> = ({ data }) => {
  const { totalBookings, completedBookings, recentBookings } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Guide Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your bookings and recent activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Total Bookings</p>
            <p className="text-2xl font-semibold">{totalBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Completed Bookings</p>
            <p className="text-2xl font-semibold">{completedBookings}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardContent>
          <p className="text-gray-500 mb-3 font-medium">Recent Bookings</p>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500">No recent bookings.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Tourist</th>
                    <th className="px-4 py-2 text-left">Listing</th>
                    <th className="px-4 py-2 text-left">Start Date</th>
                    <th className="px-4 py-2 text-left">End Date</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="px-4 py-2">{booking.touristName}</td>
                      <td className="px-4 py-2">{booking.listingTitle}</td>
                      <td className="px-4 py-2">
                        {new Date(booking.startAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(booking.endAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">৳ {booking.totalPrice}</td>
                      <td className="px-4 py-2">
                        <Badge
                          className={
                            booking.status === 'COMPLETED'
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideDashboardStats;
