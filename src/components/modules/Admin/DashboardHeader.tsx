'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Card className="border shadow-none-none bg-transparent">
      <CardContent className="flex flex-col sm:flex-row sm:items-center px-0 py-4 gap-4">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
