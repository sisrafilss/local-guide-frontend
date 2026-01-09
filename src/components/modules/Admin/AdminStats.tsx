'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface AdminStatsProps {
  data: {
    totalUsers: number;
    guideStats: {
      totalGuides: number;
      verifiedGuides: number;
      unverifiedGuides: number;
      averageDailyRate: number;
      expertiseBreakdown: Record<string, number>;
      recentGuides: {
        id: string;
        name: string;
        email: string;
        dailyRate: number;
        expertise: string | null;
        verificationStatus: 'VERIFIED' | 'UNVERIFIED';
      }[];
    };
    touristStats: {
      totalTourists: number;
      activeTourists: number;
      inactiveTourists: number;
      recentTourists: {
        id: string;
        name: string;
        email: string;
        status: 'ACTIVE' | 'INACTIVE';
      }[];
    };
  };
}

const AdminDashboardStats: React.FC<AdminStatsProps> = ({ data }) => {
  const { totalUsers, guideStats, touristStats } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of users, guides, and tourists.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Total Guides</p>
            <p className="text-2xl font-semibold">{guideStats.totalGuides}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Verified Guides</p>
            <p className="text-2xl font-semibold">
              {guideStats.verifiedGuides}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-500">Average Daily Rate</p>
            <p className="text-2xl font-semibold">
              ৳ {guideStats.averageDailyRate}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expertise Breakdown */}
      <Card>
        <CardContent>
          <p className="text-gray-500 mb-3 font-medium">Expertise Breakdown</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(guideStats.expertiseBreakdown).map(
              ([expertise, count]) => (
                <Badge key={expertise} className="bg-green-500 text-white">
                  {expertise}: {count}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Guides */}
      <Card>
        <CardContent>
          <p className="text-gray-500 mb-3 font-medium">Recent Guides</p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Daily Rate</th>
                  <th className="px-4 py-2 text-left">Expertise</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {guideStats.recentGuides.map((guide) => (
                  <tr key={guide.id} className="border-t">
                    <td className="px-4 py-2">{guide.name}</td>
                    <td className="px-4 py-2">{guide.email}</td>
                    <td className="px-4 py-2">৳ {guide.dailyRate}</td>
                    <td className="px-4 py-2">
                      {guide.expertise || 'Unknown'}
                    </td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          guide.verificationStatus === 'VERIFIED'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }
                      >
                        {guide.verificationStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tourist Stats */}
      <Card>
        <CardContent>
          <p className="text-gray-500 mb-3 font-medium">Tourist Overview</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
            <Card>
              <CardContent className="text-center">
                <p className="text-gray-500">Total Tourists</p>
                <p className="text-xl font-semibold">
                  {touristStats.totalTourists}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <p className="text-gray-500">Active Tourists</p>
                <p className="text-xl font-semibold">
                  {touristStats.activeTourists}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <p className="text-gray-500">Inactive Tourists</p>
                <p className="text-xl font-semibold">
                  {touristStats.inactiveTourists}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tourists */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {touristStats.recentTourists.map((tourist) => (
                  <tr key={tourist.id} className="border-t">
                    <td className="px-4 py-2">{tourist.name}</td>
                    <td className="px-4 py-2">{tourist.email}</td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          tourist.status === 'ACTIVE'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }
                      >
                        {tourist.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardStats;
