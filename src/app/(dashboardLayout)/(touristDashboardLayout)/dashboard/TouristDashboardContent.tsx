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
  CheckCircle2,
  TrendingUp,
  Wallet,
  Star,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  status: string;
  totalPrice: number;
  startAt: string;
  listingTitle: string;
  listingCity: string;
  guideName: string;
  paymentStatus: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  listingTitle?: string;
  createdAt: string;
}

interface TouristDashboardData {
  overview: {
    totalBookings: number;
    completedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
  };
  spending: {
    totalSpent: number;
    monthlySpent: number;
    lastMonthSpent: number;
  };
  bookingsByStatus: Record<string, number>;
  upcomingBookings: Booking[];
  recentBookings: Booking[];
  myReviews: Review[];
}

interface TouristDashboardContentProps {
  data: TouristDashboardData | null;
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

const TouristDashboardContent: React.FC<TouristDashboardContentProps> = ({ data }) => {
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

  const { overview, spending, recentBookings, myReviews } = data;

  const spendingTrend = spending.lastMonthSpent > 0 
    ? Math.round(((spending.monthlySpent - spending.lastMonthSpent) / spending.lastMonthSpent) * 100)
    : 0;

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto pb-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
             <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <LayoutDashboard className="h-6 w-6" />
             </div>
             Tourist Dashboard
          </h1>
          <p className="text-sm font-medium text-muted-foreground ml-1">Summary of your travel activities and spending.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Bookings', value: overview.totalBookings, Icon: Ticket, color: 'text-blue-500' },
          { label: 'Completed Tours', value: overview.completedBookings, Icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Total Spending', value: `৳ ${spending.totalSpent.toLocaleString()}`, Icon: Wallet, color: 'text-amber-500' },
          { label: 'Pending Bookings', value: overview.pendingBookings, Icon: Clock, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="shadow-sm border-border/50 bg-card/50 hover:bg-card transition-all group rounded-2xl overflow-hidden border-b-4 border-l-0 border-r-0 border-t-0 hover:translate-y-[-2px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between pb-3">
                  <div className={`p-2.5 rounded-xl bg-background border border-border/50 shadow-sm transition-transform group-hover:scale-110`}>
                    <stat.Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</p>
                  <div className="text-3xl font-black tracking-tighter text-foreground italic">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="shadow-sm border-border/50 bg-card/30 backdrop-blur-md rounded-2xl overflow-hidden h-full flex flex-col border-2">
            <CardHeader className="pb-4 bg-muted/20 border-b border-border/40">
              <div className="flex items-center justify-between">
                 <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Recent Bookings
                 </CardTitle>
                 <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-widest">Active Orders</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 px-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/40 bg-muted/10">
                    <TableHead className="text-[10px] font-black uppercase tracking-wider px-6 h-10">Tour Title</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider px-6 h-10">Guide</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider px-6 h-10">Date</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider px-6 h-10 text-right">Price</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-wider px-6 h-10 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-t border-border/20 group hover:bg-muted/10 transition-colors">
                        <TableCell className="py-4 px-6">
                           <p className="font-black text-xs text-foreground group-hover:text-primary transition-colors italic truncate max-w-[180px]">{booking.listingTitle}</p>
                           <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                              <MapPin className="h-2.5 w-2.5" />
                              {booking.listingCity}
                           </p>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-3 w-3 text-primary" />
                             </div>
                             <span className="text-xs font-bold text-foreground/80">{booking.guideName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 whitespace-nowrap text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                           {new Date(booking.startAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                           <div className="flex flex-col items-end">
                              <span className="font-black text-xs text-foreground italic">৳ {booking.totalPrice.toLocaleString()}</span>
                              <Badge 
                                variant="ghost" 
                                className={cn(
                                  "p-0 text-[8px] font-black uppercase tracking-[0.2em] h-auto shadow-none mt-0.5",
                                  booking.paymentStatus === 'PAID' ? "text-emerald-500/80" : "text-amber-500/80"
                                )}
                              >
                                {booking.paymentStatus}
                              </Badge>
                           </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-md border shadow-none bg-background/50",
                              booking.status === 'CONFIRMED' 
                                ? "text-emerald-600 border-emerald-500/20" 
                                : booking.status === 'CANCELLED'
                                ? "text-destructive border-destructive/20"
                                : "text-amber-600 border-amber-500/20"
                            )}
                          >
                             <div className={cn("w-1 h-1 rounded-full mr-1.5", 
                                booking.status === 'CONFIRMED' ? "bg-emerald-500" : 
                                booking.status === 'CANCELLED' ? "bg-destructive" : "bg-amber-500 animate-pulse"
                             )} />
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground text-xs font-bold uppercase tracking-widest italic opacity-50">
                         No bookings found.
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
              <Card className="shadow-sm border-border/50 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm rounded-2xl overflow-hidden border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     <TrendingUp className="h-4 w-4 text-primary" />
                     Spending Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-5 rounded-2xl bg-background border border-border/40 shadow-inner">
                     <p className="text-[10px] font-black text-muted-foreground/60 mb-2 uppercase tracking-widest">Monthly Spending</p>
                     <p className="text-4xl font-black tracking-tighter text-foreground italic">৳ {spending.monthlySpent.toLocaleString()}</p>
                     <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest">
                           {spendingTrend >= 0 ? (
                              <span className="text-destructive flex items-center gap-0.5">+{spendingTrend}% Increased</span>
                           ) : (
                              <span className="text-emerald-600 flex items-center gap-0.5">{spendingTrend}% Decreased</span>
                           )}
                        </div>
                        <span className="text-[9px] font-medium text-muted-foreground italic">vs last month</span>
                     </div>
                  </div>
                </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border-2">
                <CardHeader className="pb-4">
                   <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      Booking Status
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                      {Object.entries(data.bookingsByStatus).map(([status, count], idx) => (
                         <div key={status} className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/10">
                            <div className="flex items-center gap-3">
                               <div className={cn("w-1.5 h-1.5 rounded-full", idx === 0 ? "bg-amber-500" : (idx === 1 ? "bg-emerald-500" : "bg-blue-500"))} />
                               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{status}</span>
                            </div>
                            <span className="text-xs font-black italic">{count}</span>
                         </div>
                      ))}
                   </div>
                </CardContent>
              </Card>
           </motion.div>

           <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-border/50 bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                     <Star className="h-4 w-4 text-amber-500" />
                     Your Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myReviews.length > 0 ? (
                      myReviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="p-4 rounded-2xl border border-border/20 bg-background/60 shadow-sm space-y-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                               <Star key={i} className={cn("h-2.5 w-2.5", i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted/30")} />
                            ))}
                          </div>
                          <p className="text-[11px] italic font-medium text-foreground/80 leading-relaxed truncate">"{review.comment}"</p>
                          <div className="flex items-center justify-between pt-1">
                             <span className="text-[9px] font-black text-primary uppercase tracking-widest truncate max-w-[100px]">{review.listingTitle || 'Tour Review'}</span>
                             <span className="text-[8px] font-bold text-muted-foreground/50">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                       <div className="py-8 flex flex-col items-center justify-center text-muted-foreground/30 gap-2">
                          <Star className="h-8 w-8 opacity-10" strokeWidth={1} />
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] italic">No reviews yet</p>
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

export default TouristDashboardContent;
