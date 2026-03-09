"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ManagementPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

const ManagementPageHeader = ({
  title,
  description,
  action,
  children,
}: ManagementPageHeaderProps) => {
  const Icon = action?.icon || Plus;
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2 border-b border-border/40 pb-6 mb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm font-medium text-muted-foreground max-w-lg">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {action && (
          <Button onClick={action.onClick} className="font-bold shadow-lg shadow-primary/20 rounded-lg h-10 px-5">
            <Icon className="mr-2 h-4 w-4" strokeWidth={3} />
            {action.label}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ManagementPageHeader;
