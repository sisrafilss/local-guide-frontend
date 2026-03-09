'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/ModeToggler';
import { NavSection } from '@/types/dashboard.interface';
import { UserInfo } from '@/types/user.interface';
import { Bell, Menu, Search, Command, LayoutGrid, Zap, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import DashboardMobileSidebar from './DashboardMobileSidebar';
import UserDropdown from './UserDropdown';
import { cn } from '@/lib/utils';

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener('resize', checkSmallerScreen);

    return () => {
      window.removeEventListener('resize', checkSmallerScreen);
    };
  }, []);

  const getRoleGradient = () => {
    switch (userInfo.role) {
       case 'ADMIN': return 'from-primary to-primary/60';
       case 'GUIDE': return 'from-sky-500 to-sky-600';
       case 'TOURIST': return 'from-emerald-500 to-emerald-600';
       default: return 'from-primary to-primary/80';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/20 bg-card/40 backdrop-blur-3xl px-4 md:px-8">
      <div className="flex h-20 items-center justify-between gap-6 max-w-[1600px] mx-auto">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all border border-border/20 shadow-sm active:scale-90">
                <Menu className="h-5 w-5 text-foreground/60" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 border-r border-border/20 overflow-hidden rounded-r-[3rem]">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || ''}
              />
            </SheetContent>
          </Sheet>
          {/* Mobile Logo Substrate */}
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
             <LayoutGrid className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Global Search Interface */}
        <div className="hidden md:flex flex-1 max-w-xl group">
          <div className="relative w-full overflow-hidden rounded-[1.5rem] bg-muted/40 border-2 border-border/20 focus-within:bg-background focus-within:border-primary/40 focus-within:shadow-[0_0_24px_rgba(234,179,8,0.1)] transition-all duration-300">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <Search className="h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
               <div className="h-3 w-px bg-border/40 mx-1" />
            </div>
            <Input 
              type="search" 
              placeholder="Search global buffers..." 
              className="h-12 border-none bg-transparent pl-16 pr-20 font-black italic text-xs tracking-widest placeholder:text-muted-foreground/30 ring-0 focus-visible:ring-0 active:ring-0 shadow-none capitalize"
            />
            {/* Command Trigger Motif */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-background/60 border border-border/40 backdrop-blur-md opacity-20 pointer-events-none group-focus-within:opacity-100 transition-opacity">
               <Command className="h-3 w-3" />
               <span className="text-[10px] font-black italic tracking-tighter">CMD_K</span>
            </div>
          </div>
        </div>

        {/* Action Network */}
        <div className="flex items-center gap-3">
          {/* Specialized Label (Desktop Only) */}
          <div className="hidden lg:flex flex-col items-end mr-4 select-none opacity-40 group hover:opacity-100 transition-opacity">
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground leading-none mb-1 italic">Real-Time_Logic</span>
             <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Status.Buffer_active</span>
          </div>

          <ModeToggle />

          {/* Integrated Notification Engine */}
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-muted/30 border border-border/20 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all active:scale-95 group relative">
            <Bell className="h-5 w-5 text-muted-foreground/60 transition-colors group-hover:text-primary" />
            <div className="absolute top-2.5 right-2.5 pointer-events-none">
               <div className="h-2 w-2 rounded-full bg-primary animate-ping opacity-40" />
               <div className="absolute inset-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            </div>
          </Button>

          {/* User Auth Node */}
          <div className="pl-3 border-l border-border/20 ml-2">
             <UserDropdown userInfo={userInfo} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
