"use client";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Eye,
  Loader2,
  MoreHorizontal,
  Trash,
  Inbox,
  SearchX,
  Plus
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

// const ManagementTable<T> = (props: ManagementTableProps<T>) => {
//   return <div>ManagementTable</div>;
// };

function ManagementTable<T>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No records found.",
  isRefreshing = false,
}: ManagementTableProps<T>) {
  const hasActions = onView || onEdit || onDelete;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";

  const handleSort = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Toggle sort order if clicking the same column
    if (currentSortBy === sortKey) {
      const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
      params.set("sortOrder", newOrder);
    } else {
      // New column, default to descending
      params.set("sortBy", sortKey);
      params.set("sortOrder", "desc");
    }

    params.set("page", "1"); // Reset to first page

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const getSortIcon = (sortKey?: string) => {
    if (!sortKey) return null;

    if (currentSortBy !== sortKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
    }

    return currentSortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };
  return (
    <>
      <div className="rounded-xl border border-border/60 relative overflow-hidden bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
        {/* Refreshing Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Refreshing...</p>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              {columns?.map((column, colIndex) => (
                <TableHead key={colIndex} className={column.className}>
                  {column.sortKey ? (
                    <span
                      onClick={() => handleSort(column.sortKey!)}
                      className="flex items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
                    >
                      {column.header}
                      {getSortIcon(column.sortKey)}
                    </span>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="w-[70px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="text-center py-20"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in zoom-in duration-300">
                    <div className="p-4 rounded-full bg-muted/50 text-muted-foreground/30 ring-1 ring-border/50">
                      <Inbox className="h-10 w-10" strokeWidth={1} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight">{emptyMessage}</h3>
                      <p className="text-sm text-muted-foreground font-medium">Try adjusting your filters or adding a new record.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item, index) => (
                <TableRow 
                  key={getRowKey(item)} 
                  className="group transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={cn("py-4", col.className)}>
                      {typeof col.accessor === "function" ? (
                        <div className="flex items-center font-medium">
                          {col.accessor(item)}
                        </div>
                      ) : (
                        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                          {String(item[col.accessor])}
                        </span>
                      )}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] p-1.5 rounded-xl border-border/40 shadow-xl">
                          {onView && (
                            <DropdownMenuItem 
                              onClick={() => onView(item)}
                              className="rounded-lg h-9 font-medium"
                            >
                              <Eye className="mr-3 h-4 w-4 text-primary/70" />
                              View Details
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem 
                              onClick={() => onEdit(item)}
                              className="rounded-lg h-9 font-medium"
                            >
                              <Edit className="mr-3 h-4 w-4 text-sky-600/70" />
                              Edit Record
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <>
                              <div className="h-px bg-border/40 my-1" />
                              <DropdownMenuItem
                                onClick={() => onDelete(item)}
                                className="text-destructive focus:bg-destructive/5 focus:text-destructive rounded-lg h-9 font-medium"
                              >
                                <Trash className="mr-3 h-4 w-4 opacity-70" />
                                Remove Item
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ManagementTable;
