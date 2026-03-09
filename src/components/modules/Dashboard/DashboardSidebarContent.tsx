'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getIconComponent } from '@/lib/icon-mapper';

import { cn } from '@/lib/utils';
import { NavSection } from '@/types/dashboard.interface';
import { UserInfo } from '@/types/user.interface';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, User, ShieldCheck, LayoutDashboard, ChevronRight, LogOut, Settings, Bell } from 'lucide-react';
import LogoutButton from '@/components/shared/LogoutButton';

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  const getRoleGradient = () => {
    switch (userInfo.role) {
       case 'ADMIN': return 'from-primary to-primary/60';
       case 'GUIDE': return 'from-sky-500 to-sky-600';
       case 'TOURIST': return 'from-emerald-500 to-emerald-600';
       default: return 'from-primary to-primary/80';
    }
  };

  return (
    <div className="hidden md:flex h-full w-72 flex-col border-r border-border/40 bg-card/60 backdrop-blur-3xl relative overflow-hidden">
      {/* Dynamic Background Blur Accent */}
      <div className={cn("absolute -top-24 -left-24 h-64 w-64 blur-[100px] opacity-10 rounded-full bg-gradient-to-br", getRoleGradient())} />
      
      {/* Logo/Brand Section */}
      <div className="relative flex h-20 items-center px-8 border-b border-border/20">
        <Link href="/" className="group flex items-center space-x-3 transition-all active:scale-95">
          <div className={cn("relative flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-6 bg-gradient-to-br", getRoleGradient())}>
             <Compass className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black italic tracking-tighter text-foreground leading-none">LOCAL GUIDE</span>
            <span className="text-[9px] font-black tracking-[0.3em] text-muted-foreground uppercase opacity-40">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Navigation Area */}
      <ScrollArea className="flex-1 px-4 py-8">
        <nav className="space-y-10">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-4">
              {section.title && (
                <div className="flex items-center gap-3 px-4">
                   <div className={cn("h-1 w-1 rounded-full", userInfo.role === 'ADMIN' ? 'bg-primary' : (userInfo.role === 'GUIDE' ? 'bg-sky-500' : 'bg-emerald-500'))} />
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 italic leading-none">
                     {section.title}
                   </h4>
                </div>
              )}
              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-xs font-black uppercase tracking-widest transition-all italic relative overflow-hidden',
                        isActive
                          ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      )}
                    >
                      <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground/60 group-hover:text-primary")} />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? 'secondary' : 'default'}
                          className={cn("ml-auto text-[9px] font-black h-5 px-2 rounded-lg", isActive ? "bg-white/20 text-white border-none" : "bg-primary/10 text-primary border-none")}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      
                      {isActive && (
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Status at Bottom */}
      <div className="relative mt-auto border-t border-border/20 p-6 bg-muted/5">
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-background/40 border border-border/20 shadow-sm group hover:bg-background/80 transition-all">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 flex-shrink-0 transition-transform group-hover:rotate-3 bg-gradient-to-br", getRoleGradient())}>
            <span className="text-lg font-black italic text-white leading-none">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-black italic uppercase tracking-tighter truncate text-foreground leading-none mb-1">{userInfo.name}</p>
            <div className="flex items-center gap-1.5 opacity-60">
               <div className={cn("h-1.5 w-1.5 rounded-full", userInfo.role === 'ADMIN' ? 'bg-primary' : (userInfo.role === 'GUIDE' ? 'bg-sky-500' : 'bg-emerald-500'))} />
               <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground italic">
                 {userInfo.role}
               </span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
        </div>
        
        {/* Secondary Actions / Logout Buffer */}
        <div className="mt-4 px-2">
           <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
