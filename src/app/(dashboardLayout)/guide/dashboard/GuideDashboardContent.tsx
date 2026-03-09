'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
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
import { 
  Ticket, 
  LayoutList, 
  CheckCircle2,
  TrendingUp,
  Wallet,
  ShieldAlert,
  Star,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  status: string;
  totalPrice: number;
  startAt: string;
  endAt?: string;
  listingTitle: string;
  listingCity: string;
  touristName: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  touristName: string;
  createdAt: string;
}

interface GuideDashboardData {
  overview: {
    totalBookings: number;
    completedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    totalListings: number;
    activeListings: number;
    verificationStatus: boolean;
  };
  earnings: {
    totalEarnings: number;
    monthlyEarnings: number;
    lastMonthEarnings: number;
  };
  bookingsByStatus: Record<string, number>;
  upcomingBookings: Booking[];
  recentBookings: Booking[];
  reviews: Review[];
}

interface GuideDashboardContentProps {
  data: GuideDashboardData | null;
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

const GuideDashboardContent: React.FC<GuideDashboardContentProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-xs font-medium">Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  const { overview, earnings, recentBookings, reviews } = data;

  const earningsGrowth = earnings.lastMonthEarnings > 0 
    ? Math.round(((earnings.monthlyEarnings - earnings.lastMonthEarnings) / earnings.lastMonthEarnings) * 100)
    : 0;

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Guide Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your bookings and recent activities.</p>
        </div>
        {!overview.verificationStatus && (
           <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-4 py-1 gap-2 font-semibold">
              <ShieldAlert className="h-3.5 w-3.5" />
              Not Verified
           </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: overview.totalBookings, Icon: Ticket, color: 'text-blue-500' },
          { label: 'Completed Bookings', value: overview.completedBookings, Icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Total Earnings', value: `৳ ${earnings.totalEarnings.toLocaleString()}`, Icon: Wallet, color: 'text-amber-500' },
          { label: 'Active Listings', value: overview.activeListings, Icon: LayoutList, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="shadow-sm border-border/50 bg-card/50 hover:bg-card transition-all group rounded-xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between pb-3">
                  <div className={`p-2 rounded-lg bg-background border border-border/50 group-hover:border-primary/20 transition-colors shadow-sm`}>
                    <stat.Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <div className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="shadow-sm border-border/50 bg-card/50 rounded-xl overflow-hidden h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/40 bg-muted/30">
                    <TableHead className="text-xs font-semibold px-6 h-10">Tourist</TableHead>
                    <TableHead className="text-xs font-semibold px-6 h-10">Listing</TableHead>
                    <TableHead className="text-xs font-semibold px-6 h-10">Start Date</TableHead>
                    <TableHead className="text-xs font-semibold px-6 h-10">End Date</TableHead>
                    <TableHead className="text-xs font-semibold px-6 h-10 text-right">Price</TableHead>
                    <TableHead className="text-xs font-semibold px-6 h-10 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-t border-border/30 group">
                        <TableCell className="py-3 px-6 whitespace-nowrap">
                           <span className="text-xs font-medium text-foreground">{booking.touristName}</span>
                        </TableCell>
                        <TableCell className="py-3 px-6">
                          <p className="font-medium text-xs text-foreground truncate max-w-[150px]">{booking.listingTitle}</p>
                        </TableCell>
                        <TableCell className="py-3 px-6 whitespace-nowrap text-xs text-muted-foreground">
                           {new Date(booking.startAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="py-3 px-6 whitespace-nowrap text-xs text-muted-foreground">
                           {booking.endAt ? new Date(booking.endAt).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell className="py-3 px-6 text-right font-medium text-xs whitespace-nowrap">
                           ৳ {booking.totalPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="py-3 px-6 text-right">
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[10px] h-6 px-2.5 rounded gap-1 border shadow-none",
                              booking.status === 'COMPLETED' 
                                ? "bg-green-500 text-white border-transparent" 
                                : "bg-blue-500 text-white border-transparent"
                            )}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-xs font-medium italic">
                         No recent bookings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
           <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border/50 bg-card/50 rounded-xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                     <p className="text-xs font-medium text-primary/70 mb-1">Monthly Earnings</p>
                     <p className="text-3xl font-bold tracking-tight text-foreground">৳ {earnings.monthlyEarnings.toLocaleString()}</p>
                     <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Increased by {earningsGrowth}% from last month
                     </div>
                  </div>
                </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border/50 bg-card/50 rounded-xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Verification</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-muted-foreground">Status</span>
                      {overview.verificationStatus ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none uppercase text-[10px] font-bold px-3">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 shadow-none uppercase text-[10px] font-bold px-3">
                          Pending
                        </Badge>
                      )}
                   </div>
                   {!overview.verificationStatus && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-xs font-medium text-amber-600/80 leading-relaxed">
                         <AlertCircle className="h-4 w-4 shrink-0" />
                         Your account is pending identity verification.
                      </div>
                   )}
                </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border/50 bg-card/50 rounded-xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reviews.length > 0 ? (
                      reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="p-3 rounded-lg border border-border/40 bg-background/40 space-y-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                               <Star key={i} className={cn("h-3 w-3", i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted/40")} />
                            ))}
                          </div>
                          <p className="text-xs italic text-foreground/80 leading-snug truncate">"{review.comment}"</p>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">— {review.touristName}</p>
                        </div>
                      ))
                    ) : (
                       <div className="py-6 flex flex-col items-center justify-center text-muted-foreground/40 gap-2">
                          <Star className="h-8 w-8 opacity-20" />
                          <p className="text-xs font-medium uppercase">No reviews yet</p>
                       </div>
                    )}
                  </div>
                </CardContent>
              </Card>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GuideDashboardContent;
