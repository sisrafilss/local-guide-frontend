'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Map, 
  Ticket, 
  LayoutList, 
  User, 
  Headset, 
  ShieldCheck,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface DashboardData {
  overview: {
    totalUsers: number;
    totalGuides: number;
    totalTourists: number;
    totalBookings: number;
    totalListings: number;
    verifiedGuides: number;
    unverifiedGuides: number;
    activeTourists: number;
    activeListings: number;
  };
  monthlyStats: {
    monthlyBookings: number;
    lastMonthBookings: number;
    growth: number;
  };
  financials: {
    averageDailyRate: number;
    totalRevenue: number;
  };
  bookingsByStatus: {
    CONFIRMED: number;
    PENDING: number;
  };
  recentBookings: Array<{
    id: string;
    status: string;
    totalPrice: number;
    startAt: string;
    listingTitle: string;
    listingCity: string;
    touristName: string;
    touristEmail: string;
    guideName: string;
    createdAt: string;
  }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  }>;
}

interface AdminDashboardContentProps {
  data: DashboardData | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-xs font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const { overview, monthlyStats, financials, bookingsByStatus, recentBookings, recentUsers } = data;

  const totalBookings = bookingsByStatus.CONFIRMED + bookingsByStatus.PENDING;
  const confirmedPercentage = totalBookings > 0 ? Math.round((bookingsByStatus.CONFIRMED / totalBookings) * 100) : 0;
  const pendingPercentage = totalBookings > 0 ? Math.round((bookingsByStatus.PENDING / totalBookings) * 100) : 0;

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: overview.totalUsers, Icon: Users, tr: `+${monthlyStats.growth}%`, color: 'text-blue-500' },
          { label: 'Active Guides', value: overview.totalGuides, Icon: Map, tr: 'Stable', color: 'text-emerald-500' },
          { label: 'Recent Bookings', value: overview.totalBookings, Icon: Ticket, tr: `+${monthlyStats.monthlyBookings}`, color: 'text-amber-500' },
          { label: 'Total Listings', value: overview.totalListings, Icon: LayoutList, tr: 'Active', color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="shadow-sm border-border/50 bg-card/50 hover:bg-card transition-colors group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between pb-3">
                  <div className={`p-2 rounded-lg bg-background border border-border/50 group-hover:border-primary/20 transition-colors`}>
                    <stat.Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0 h-4 border-primary/10 bg-primary/5 text-primary">
                    {stat.tr}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="text-3xl font-bold tracking-tight">{stat.value.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full shadow-none border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Booking Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Confirmed</span>
                  <span className="text-primary">{confirmedPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${confirmedPercentage}%` }}
                    className="bg-primary h-full rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Pending</span>
                  <span className="text-orange-500">{pendingPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pendingPercentage}%` }}
                    className="bg-orange-500 h-full rounded-full"
                  />
                </div>
              </div>
              <div className="pt-6 border-t grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg Rate</p>
                  <p className="text-lg font-bold">{financials.averageDailyRate.toLocaleString()} <span className="text-[10px]">BDT</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth</p>
                  <p className="text-lg font-bold">{monthlyStats.growth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="shadow-none border-border/50 bg-card/50 h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Recent Bookings</CardTitle>
              <Button variant="ghost" className="text-xs h-8 px-2 font-bold text-primary">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-[10px] font-bold uppercase h-8">Listing</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase h-8">Tourist</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-right h-8">Total</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-right h-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.length > 0 ? (
                    recentBookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking.id} className="border-border/40">
                        <TableCell className="py-2.5">
                          <p className="font-bold text-xs">{booking.listingTitle}</p>
                          <p className="text-[9px] text-muted-foreground uppercase">{booking.listingCity}</p>
                        </TableCell>
                        <TableCell className="py-2.5 text-xs font-medium">{booking.touristName}</TableCell>
                        <TableCell className="py-2.5 text-right text-xs font-bold">{booking.totalPrice.toLocaleString()} BDT</TableCell>
                        <TableCell className="py-2.5 text-right">
                          <Badge 
                            variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'} 
                            className="text-[8px] font-bold uppercase h-5 px-2 rounded-full gap-1 flex items-center w-fit ml-auto"
                          >
                            {booking.status === 'CONFIRMED' ? (
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            ) : (
                              <Clock className="h-2.5 w-2.5" />
                            )}
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-muted-foreground text-xs">No activity.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="shadow-none border-border/50 bg-card/50 h-full">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recentUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/50 hover:border-primary/20 hover:bg-background transition-all">
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center border shadow-sm">
                      {user.role === 'GUIDE' ? (
                        <Headset className="h-5 w-5 text-primary/60" />
                      ) : (
                        <User className="h-5 w-5 text-primary/60" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate leading-none">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold mt-1.5">{user.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-destructive'}`} />
                      <p className="text-[8px] font-medium text-muted-foreground">New</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-primary border-none shadow-sm text-primary-foreground min-h-[160px] flex flex-col justify-center">
            <CardContent className="p-6 flex items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 text-white/5 rotate-12">
                <ShieldCheck className="h-32 w-32" />
              </div>
              <div className="space-y-4 relative z-10">
                <div>
                  <CardTitle className="text-xl font-bold">Guide Verification</CardTitle>
                  <p className="text-xs opacity-80 font-medium mt-1">
                    {overview.unverifiedGuides} applications awaiting your review.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-[9px] font-bold uppercase opacity-60">Pending</p>
                    <p className="text-xl font-bold">{overview.unverifiedGuides}</p>
                  </div>
                  <div className="bg-white/15 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-[9px] font-bold uppercase opacity-60">Verified</p>
                    <p className="text-xl font-bold">{overview.verifiedGuides}</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="font-bold text-xs h-10 px-6 shadow-md rounded-full group relative z-10">
                Review Now
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardContent;


