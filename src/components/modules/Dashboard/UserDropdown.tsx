"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";
import { Settings, User, ShieldCheck, Zap, LogOut, ChevronDown, UserCircle2, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const handleLogout = async () => {
    await logoutUser();
  };

  const getRoleGradient = () => {
    switch (userInfo.role) {
       case 'ADMIN': return 'from-primary to-primary/60';
       case 'GUIDE': return 'from-sky-500 to-sky-600';
       case 'TOURIST': return 'from-emerald-500 to-emerald-600';
       default: return 'from-primary to-primary/80';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-12 gap-3 px-3 rounded-2xl bg-muted/20 border border-border/20 hover:bg-muted/40 transition-all group overflow-hidden active:scale-95">
          <div className={cn("relative h-8 w-8 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 bg-gradient-to-br", getRoleGradient())}>
            <span className="text-sm font-black italic text-white leading-none">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden lg:flex flex-col items-start pr-1 select-none">
             <span className="text-[10px] font-black italic tracking-tighter text-foreground leading-none mb-1 uppercase truncate max-w-[80px]">
               {userInfo.name.split(' ')[0]}
             </span>
             <div className="flex items-center gap-1 opacity-40">
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground italic leading-none">{userInfo.role}_Node</span>
             </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72 p-1.5 rounded-[2rem] bg-card/80 backdrop-blur-3xl border border-border/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
        <DropdownMenuLabel className="p-4 mb-2">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border/40 relative overflow-hidden group">
            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br", getRoleGradient())}>
              <span className="text-xl font-black italic text-white leading-none">
                 {userInfo.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col space-y-1 relative z-10 overflow-hidden">
               <p className="text-sm font-black italic uppercase tracking-tighter text-foreground leading-none truncate">{userInfo.name}</p>
               <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground italic opacity-60 truncate">
                  <Mail className="h-2.5 w-2.5" />
                  {userInfo.email}
               </div>
               <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg w-fit mt-1 border", 
                  userInfo.role === 'ADMIN' ? 'bg-primary/10 border-primary/20 text-primary' : 
                  (userInfo.role === 'GUIDE' ? 'bg-sky-500/10 border-sky-500/20 text-sky-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600')
               )}>
                  <ShieldCheck className="h-2.5 w-2.5" />
                  <span className="text-[8px] font-black uppercase tracking-widest italic">{userInfo.role}_Deployment</span>
               </div>
            </div>
            {/* Background Texture Decor */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/20 mx-4" />
        
        <div className="space-y-1 py-2">
           <DropdownMenuItem asChild className="rounded-xl mx-2 font-black italic text-[11px] uppercase tracking-widest px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group">
             <Link href={"/my-profile"} className="flex items-center w-full">
               <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3 group-hover:bg-primary group-hover:text-white transition-all">
                  <UserCircle2 className="h-4 w-4" />
               </div>
               <span>Profile_Data</span>
               <ExternalLink className="ml-auto h-3 w-3 opacity-20 group-hover:opacity-100 transition-opacity" />
             </Link>
           </DropdownMenuItem>

           <DropdownMenuItem asChild className="rounded-xl mx-2 font-black italic text-[11px] uppercase tracking-widest px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group">
             <Link href={"/change-password"} className="flex items-center w-full">
               <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3 group-hover:bg-primary group-hover:text-white transition-all">
                  <Settings className="h-4 w-4" />
               </div>
               <span>Change_Key</span>
               <ExternalLink className="ml-auto h-3 w-3 opacity-20 group-hover:opacity-100 transition-opacity" />
             </Link>
           </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-border/20 mx-4" />
        
        <div className="p-2">
           <DropdownMenuItem
             onClick={handleLogout}
             className="cursor-pointer rounded-xl bg-destructive/5 hover:bg-destructive shadow-sm group transition-all px-4 py-3"
           >
             <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                   <div className="h-7 w-7 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive group-hover:bg-white group-hover:text-destructive transition-all">
                      <LogOut className="h-4 w-4" />
                   </div>
                   <span className="font-black italic text-[11px] uppercase tracking-widest text-destructive group-hover:text-white transition-colors">Sign_Out_Now</span>
                </div>
                <Zap className="h-3 w-3 text-destructive group-hover:text-white group-hover:animate-pulse transition-all opacity-40 group-hover:opacity-100" />
             </div>
           </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
