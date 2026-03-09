'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardHeader from '@/components/modules/Admin/DashboardHeader';
import StatCard from '@/components/modules/Admin/StatCard';
import {
  Users,
  UserCheck,
  UserX,
  DollarSign,
  ShieldCheck,
  Activity,
} from 'lucide-react';
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
  if (!data) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  const { totalUsers, guideStats, touristStats } = data;

  const verificationRate =
    guideStats.totalGuides > 0
      ? Math.round((guideStats.verifiedGuides / guideStats.totalGuides) * 100)
      : 0;

  const activeUserRate =
    touristStats.totalTourists > 0
      ? Math.round(
          (touristStats.activeTourists / touristStats.totalTourists) * 100
        )
      : 0;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Admin Dashboard"
        description="Overview of all users, guides, and tourists in the system."
      />

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          accentColor="sky"
        />
        <StatCard
          title="Total Guides"
          value={guideStats.totalGuides}
          icon={UserCheck}
          accentColor="emerald"
        />
        <StatCard
          title="Verified Guides"
          value={guideStats.verifiedGuides}
          icon={ShieldCheck}
          accentColor="emerald"
        />
        <StatCard
          title="Verification Rate"
          value={`${verificationRate}%`}
          icon={ShieldCheck}
          accentColor="amber"
          subtitle="of total guides"
        />
        <StatCard
          title="Avg Daily Rate"
          value={`৳ ${guideStats.averageDailyRate}`}
          icon={DollarSign}
          accentColor="sky"
        />
        <StatCard
          title="Active Users"
          value={touristStats.activeTourists}
          icon={Activity}
          accentColor="emerald"
          subtitle={`${activeUserRate}% active rate`}
        />
      </div>

      {/* Expertise Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Expertise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(guideStats.expertiseBreakdown).map(
              ([expertise, count]) => (
                <Badge
                  key={expertise}
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  {expertise}: {count}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Guides */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Guides</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Daily Rate</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guideStats.recentGuides.map((guide) => (
                  <TableRow key={guide.id}>
                    <TableCell className="font-medium">{guide.name}</TableCell>
                    <TableCell>৳ {guide.dailyRate}</TableCell>
                    <TableCell>{guide.expertise || 'Unknown'}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          guide.verificationStatus === 'VERIFIED'
                            ? 'bg-emerald-500'
                            : 'bg-red-500'
                        }
                      >
                        {guide.verificationStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tourist Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tourist Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">
                  {touristStats.totalTourists}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-emerald-500/10">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Active
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {touristStats.activeTourists}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">
                  {touristStats.inactiveTourists}
                </p>
              </div>
            </div>

            {/* Recent Tourists Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {touristStats.recentTourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell className="font-medium">{tourist.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {tourist.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          tourist.status === 'ACTIVE'
                            ? 'bg-emerald-500'
                            : 'bg-red-500'
                        }
                      >
                        {tourist.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardStats;
