'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
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
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  LayoutGrid,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="relative h-12 w-12">
           <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
           <div className="absolute inset-2 rounded-lg bg-primary animate-spin" />
        </div>
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic animate-pulse">Loading Admin Data...</p>
      </div>
    );
  }

  const { overview, monthlyStats, financials, bookingsByStatus, recentBookings, recentUsers } = data;

  const totalBookings = bookingsByStatus.CONFIRMED + bookingsByStatus.PENDING;
  const confirmedPercentage = totalBookings > 0 ? Math.round((bookingsByStatus.CONFIRMED / totalBookings) * 100) : 0;
  const pendingPercentage = totalBookings > 0 ? Math.round((bookingsByStatus.PENDING / totalBookings) * 100) : 0;

  return (
    <motion.div 
      className="space-y-10 max-w-[1600px] mx-auto pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ================= Header Strategy ================= */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/20 pb-8">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-primary/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic leading-none">Management Overview</span>
           </div>
           <h1 className="text-4xl font-black italic tracking-tighter text-foreground uppercase leading-none">
              Admin <span className="text-primary italic">Overview</span>
           </h1>
        </div>
        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-muted/20 border border-border/20">
           <div className="px-4 py-2 rounded-xl bg-background border border-border/20 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 italic">Platform Latency</span>
              <p className="text-xs font-black text-foreground uppercase mt-1">0.4ms</p>
           </div>
           <div className="h-10 w-px bg-border/20 mx-1" />
           <div className="px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Net Uptime</span>
              <p className="text-xs font-black text-foreground uppercase mt-1">99.9% Live</p>
           </div>
        </div>
      </motion.div>

      {/* ================= Core Metrics ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: overview.totalUsers, Icon: Users, tr: `+${monthlyStats.growth}%`, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Active Guides', value: overview.totalGuides, Icon: Map, tr: 'Stable', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Recent Bookings', value: overview.totalBookings, Icon: Ticket, tr: `+${monthlyStats.monthlyBookings}`, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Total Listings', value: overview.totalListings, Icon: LayoutList, tr: 'Active', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="relative overflow-hidden group rounded-[2.5rem] border-2 border-border/40 bg-card/60 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg)}>
                    <stat.Icon className={cn("h-7 w-7", stat.color)} />
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary italic uppercase tracking-widest">
                    {stat.tr}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 italic">{stat.label}</p>
                  <div className="text-4xl font-black italic tracking-tighter text-foreground group-hover:text-primary transition-colors">{stat.value.toLocaleString()}</div>
                </div>
                
                {/* Decorative Background Icon */}
                <stat.Icon className="absolute -right-8 -bottom-8 h-32 w-32 text-foreground/[0.03] -rotate-12 group-hover:text-primary/[0.05] transition-colors" strokeWidth={1} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= Booking Status Logic ================= */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full rounded-[3rem] border-2 border-border/40 bg-card/40 backdrop-blur-3xl shadow-xl overflow-hidden">
            <CardHeader className="p-8 border-b border-border/20 bg-muted/5">
               <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-primary" />
                  <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">Booking Statistics</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Confirmed Bookings</span>
                      <span className="text-2xl font-black italic tracking-tighter text-foreground uppercase">Confirmed</span>
                   </div>
                   <span className="text-3xl font-black italic tracking-tighter text-primary leading-none">{confirmedPercentage}<span className="text-lg">%</span></span>
                </div>
                <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden border border-border/20 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${confirmedPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Pending Bookings</span>
                      <span className="text-2xl font-black italic tracking-tighter text-foreground uppercase">Pending</span>
                   </div>
                   <span className="text-3xl font-black italic tracking-tighter text-amber-500 leading-none">{pendingPercentage}<span className="text-lg">%</span></span>
                </div>
                <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden border border-border/20 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pendingPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-amber-500 h-full rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-border/20 grid grid-cols-2 gap-8">
                 <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Daily Rate</p>
                     <p className="text-xl font-black italic tracking-tighter text-foreground uppercase">{financials.averageDailyRate.toLocaleString()} <span className="text-[10px] font-bold">BDT</span></p>
                 </div>
                 <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 italic">Monthly Growth</p>
                     <p className="text-xl font-black italic tracking-tighter text-foreground uppercase">{monthlyStats.growth}%</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= Transaction Log ================= */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="rounded-[3rem] border-2 border-border/40 bg-card/40 backdrop-blur-3xl shadow-xl h-full overflow-hidden relative">
            <CardHeader className="p-8 border-b border-border/20 bg-muted/5 flex flex-row items-center justify-between">
               <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">Recent Bookings</CardTitle>
               </div>
               <Button variant="ghost" className="h-10 px-6 rounded-xl font-black italic uppercase tracking-widest text-[10px] border border-border/20 hover:bg-primary hover:text-white transition-all">
                  View All
               </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/20 bg-muted/10 h-14">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 italic">Listing Title</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest italic">Tourist</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right italic">Price</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right pr-8 italic">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.length > 0 ? (
                    recentBookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking.id} className="border-border/10 group hover:bg-muted/30 transition-colors h-20">
                        <TableCell className="pl-8">
                          <p className="font-black italic text-xs tracking-tighter uppercase text-foreground leading-none mb-1.5">{booking.listingTitle}</p>
                          <div className="flex items-center gap-1.5 opacity-40">
                             <Map className="h-2.5 w-2.5" />
                             <span className="text-[9px] font-black uppercase tracking-widest italic">{booking.listingCity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black italic text-[10px]">
                                 {booking.touristName.charAt(0)}
                              </div>
                              <span className="text-[11px] font-black italic uppercase tracking-tighter text-foreground">{booking.touristName}</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right">
                           <span className="text-xs font-black italic tracking-tighter text-foreground tracking-widest">৳ {booking.totalPrice.toLocaleString()}</span>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Badge 
                            variant="outline" 
                            className={cn(
                               "text-[8px] font-black uppercase tracking-widest h-7 px-3 rounded-xl gap-2 flex items-center w-fit ml-auto border-2 italic backdrop-blur-sm",
                               booking.status === 'CONFIRMED' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' : 'border-amber-500/20 bg-amber-500/5 text-amber-500'
                            )}
                          >
                            <div className={cn("h-1 w-1 rounded-full", booking.status === 'CONFIRMED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 animate-pulse')} />
                            {booking.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-24 text-center">
                         <div className="flex flex-col items-center gap-3 opacity-20">
                             <LayoutGrid className="h-10 w-10" />
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] italic">No Activity</p>
                         </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= Subject Registry ================= */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-[3rem] border-2 border-border/40 bg-card/40 backdrop-blur-3xl shadow-xl h-full overflow-hidden">
            <CardHeader className="p-8 border-b border-border/20 bg-muted/5 flex flex-row items-center justify-between">
               <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-primary" />
                  <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">Recent Users</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="group relative flex items-center gap-4 p-5 rounded-[2rem] border-2 border-border/40 bg-card/40 hover:bg-background/80 hover:border-primary/20 hover:scale-[1.02] transition-all duration-300">
                    <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border-2 border-border/20 group-hover:border-primary/20 transition-colors shadow-inner overflow-hidden">
                      {user.role === 'GUIDE' ? (
                        <Headset className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                      ) : (
                        <User className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                      )}
                      {/* Decorative Node Mask */}
                      <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black italic tracking-tighter uppercase text-foreground leading-none mb-2 truncate">{user.name}</p>
                       <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-5 px-2 rounded-lg border-primary/20 bg-primary/5 text-primary italic leading-none">
                         {user.role}
                      </Badge>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className={cn("w-2 h-2 rounded-full", user.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]')} />
                       <p className="text-[10px] font-black text-muted-foreground/30 uppercase italic">New User</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= Verification Engine ================= */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden rounded-[3rem] border-none bg-primary shadow-2xl min-h-full group">
            {/* Background Texture Logic */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
            <div className="absolute -right-12 -top-12 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-1000">
              <ShieldCheck className="h-64 w-64" strokeWidth={1} />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
            
            <CardContent className="relative z-10 p-12 h-full flex flex-col justify-between gap-12">
              <div className="space-y-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-lg">
                         <ShieldAlert className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 italic">Guide Verification</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-[0.9]">
                      Guide <br />
                      <span className="text-background italic opacity-95">Authentication</span>
                   </h2>
                   <p className="text-sm font-bold italic text-white/70 max-w-sm tracking-tight leading-relaxed">
                     {overview.unverifiedGuides} Subject applications are currently awaiting security clearance in the primary buffer.
                   </p>
                </div>

                <div className="flex gap-4">
                   <div className="flex-1 bg-white/10 p-5 rounded-[2rem] backdrop-blur-md border border-white/5 space-y-2 group/tile shadow-xl">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 italic">Queue Status</p>
                    <div className="flex items-end justify-between">
                       <p className="text-4xl font-black italic text-white tracking-tighter">{overview.unverifiedGuides}</p>
                       <Zap className="h-5 w-5 text-white/40 group-hover/tile:text-white transition-colors animate-pulse" />
                    </div>
                  </div>
                   <div className="flex-1 bg-white/10 p-5 rounded-[2rem] backdrop-blur-md border border-white/5 space-y-2 group/tile shadow-xl">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 italic">Total Verified</p>
                    <div className="flex items-end justify-between">
                       <p className="text-4xl font-black italic text-white tracking-tighter">{overview.verifiedGuides}</p>
                       <CheckCircle2 className="h-5 w-5 text-white/40 group-hover/tile:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="secondary" className="w-full md:w-fit h-14 px-10 rounded-2xl font-black italic uppercase tracking-widest text-xs shadow-2xl transition-all hover:scale-[1.05] active:scale-95 group/btn border-none bg-white text-primary">
                Review Applications
                <ArrowUpRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={3} />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardContent;
