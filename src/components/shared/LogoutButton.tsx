'use client';

import { logoutUser } from '@/services/auth/logoutUser';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className="h-9 px-2 xl:px-3 rounded-xl text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-all font-black italic uppercase tracking-widest text-[9px] xl:text-[10px] gap-1.5 border border-transparent hover:border-destructive/20 active:scale-95"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span className="hidden xl:inline">Logout</span>
    </Button>
  );
};

export default LogoutButton;
