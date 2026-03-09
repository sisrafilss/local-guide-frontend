'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SheetTitle } from '@/components/ui/sheet';
import { getIconComponent } from '@/lib/icon-mapper';
import { cn } from '@/lib/utils';
import { NavSection } from '@/types/dashboard.interface';
import { UserInfo } from '@/types/user.interface';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, ChevronRight, LayoutGrid } from 'lucide-react';
import LogoutButton from '@/components/shared/LogoutButton';

interface DashboardMobileSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarContentProps) => {
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
    <div className="flex h-full flex-col bg-card/60 backdrop-blur-3xl relative overflow-hidden">
      {/* Background Decor */}
      <div className={cn("absolute -top-20 -right-20 h-40 w-40 blur-[80px] opacity-10 rounded-full bg-gradient-to-br", getRoleGradient())} />
      
      {/* Logo Header */}
      <div className="relative flex h-20 items-center px-8 border-b border-border/20">
        <Link href="/" className="flex items-center space-x-3 transition-transform active:scale-95">
          <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br", getRoleGradient())}>
             <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black italic tracking-tighter text-foreground leading-none">LOCAL GUIDE</span>
            <span className="text-[8px] font-black tracking-[0.3em] text-muted-foreground uppercase opacity-40 italic">Mobile</span>
          </div>
        </Link>
      </div>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation Space */}
      <ScrollArea className="flex-1 px-4 py-8">
        <nav className="space-y-10 group">
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
                        'flex items-center gap-4 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest transition-all italic relative overflow-hidden',
                        isActive
                          ? 'bg-primary text-white shadow-xl shadow-primary/20'
                          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground/40")} />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? 'secondary' : 'default'}
                          className={cn("h-4 px-1.5 text-[8px] font-black leading-none uppercase", isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className={cn("h-3 w-3 opacity-20", isActive && "opacity-60")} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Status Bottom Tile */}
      <div className="relative mt-auto border-t border-border/20 p-6 bg-muted/5">
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-background/60 border border-border/20 shadow-sm">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br", getRoleGradient())}>
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
        </div>
        
        {/* Mobile Logout Action */}
        <div className="mt-4 px-2">
           <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;
