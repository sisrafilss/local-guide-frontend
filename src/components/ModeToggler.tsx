'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all active:scale-90 border-none shadow-none">
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-primary" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-1.5 rounded-2xl bg-background/80 backdrop-blur-3xl border border-border/40 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
        <DropdownMenuItem onClick={() => setTheme('light')} className="rounded-xl font-bold italic text-xs uppercase tracking-widest px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="rounded-xl font-bold italic text-xs uppercase tracking-widest px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="rounded-xl font-bold italic text-xs uppercase tracking-widest px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
