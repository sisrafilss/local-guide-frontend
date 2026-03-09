import { getDefaultDashboardRoute, UserRole } from '@/lib/auth-utils';
import { getCookie } from '@/services/auth/tokenHandlers';
import { jwtDecode } from 'jwt-decode';
import { Menu, X, Compass, UserCircle2, ChevronRight, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggler';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import LogoutButton from './LogoutButton';

/* ---------------- Types ---------------- */
type JwtPayload = {
  role: 'TOURIST' | 'GUIDE' | 'ADMIN';
  exp: number;
};

const PublicNavbar = async () => {
  const accessToken = await getCookie('accessToken');

  let role: JwtPayload['role'] | null = null;
  let dashboardRoute: string | null = null;

  if (accessToken) {
    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      role = decoded.role;
      dashboardRoute = getDefaultDashboardRoute(role as UserRole);
    } catch (error) {
      console.error('Invalid access token', error);
    }
  }

  const navItems = [
    { href: '/explore-tours', label: 'Explore Tours' },
    { href: '/summarizer', label: 'AI Summarizer' },
    { href: '/become-guide', label: 'Become a Guide' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center space-x-3 transition-all active:scale-95">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
             <Compass className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black italic tracking-tighter text-foreground leading-none">LOCAL GUIDE</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60">Authentic_Buffer</span>
          </div>
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-sm font-bold uppercase tracking-widest text-muted-foreground/80 transition-all hover:text-foreground italic"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3 pr-6 border-r border-border/40">
             <ModeToggle />
          </div>

          <div className="flex items-center gap-4">
            {role && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10">
                   <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                     <span className="text-[9px] font-black">{role.charAt(0)}</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary italic pr-1">{role}</span>
                </div>
            )}

            {accessToken ? (
              <div className="flex items-center gap-3">
                {dashboardRoute && (
                    <Link href={dashboardRoute}>
                      <Button variant="ghost" size="sm" className="font-black italic uppercase tracking-widest text-[10px] gap-2 hover:bg-primary/10 transition-colors">
                        <LayoutDashboard className="h-3.5 w-3.5" />
                        Dashboard
                      </Button>
                    </Link>
                )}
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login">
                <Button className="h-10 rounded-2xl px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Sign_In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-4 lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-mutedTransition active:scale-90">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-[350px] border-l-0 bg-background/95 backdrop-blur-3xl p-0 flex flex-col overflow-hidden"
            >
              <div className="flex h-20 items-center justify-between px-8 border-b border-border/20">
                <div className="flex items-center space-x-2">
                   <Compass className="h-5 w-5 text-primary" />
                   <span className="text-lg font-black italic tracking-tighter">LOCAL GUIDE</span>
                </div>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" className="rounded-full">
                      <X className="h-5 w-5" />
                   </Button>
                </SheetTrigger>
              </div>

              <SheetTitle className="sr-only">Nav_Logic</SheetTitle>

              <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10">
                 <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">Navigation_Main</p>
                    <nav className="flex flex-col space-y-4">
                      {navItems.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center justify-between group py-2"
                        >
                          <span className="text-3xl font-black italic tracking-tighter text-foreground group-hover:text-primary transition-colors uppercase">{link.label}</span>
                          <ChevronRight className="h-5 w-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                        </Link>
                      ))}
                    </nav>
                 </div>

                 {role && (
                    <div className="space-y-6 pt-6 border-t border-border/20">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">User_Buffer</p>
                       <div className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/40">
                          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 capitalize font-black text-xl text-white">
                             {role.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary italic italic">{role}</span>
                             <span className="text-xs font-bold text-muted-foreground italic">Authenticated_Access</span>
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              <div className="p-8 border-t border-border/20 space-y-4">
                 {accessToken ? (
                   <div className="space-y-3">
                      {dashboardRoute && (
                         <Link href={dashboardRoute}>
                           <Button className="w-full h-12 rounded-2xl font-black italic uppercase tracking-widest text-[11px] gap-2 justify-start px-6 bg-muted text-foreground border border-border hover:bg-muted/80">
                              <LayoutDashboard className="h-4 w-4" />
                              Access_Dashboard
                           </Button>
                         </Link>
                      )}
                      <LogoutButton />
                   </div>
                 ) : (
                   <Link href="/login">
                     <Button className="w-full h-14 rounded-3xl font-black italic uppercase tracking-widest text-xs shadow-2xl shadow-primary/30">
                        Sign_In_Portal
                     </Button>
                   </Link>
                 )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
