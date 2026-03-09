'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type AccentColor = 'emerald' | 'sky' | 'amber';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accentColor?: AccentColor;
  subtitle?: string;
}

const colorClasses: Record<AccentColor, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-500',
  sky: 'bg-sky-500/10 text-sky-500',
  amber: 'bg-amber-500/10 text-amber-500',
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  accentColor = 'emerald',
  subtitle,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorClasses[accentColor]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
