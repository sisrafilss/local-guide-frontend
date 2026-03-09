'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, DollarSign, MapPin, Users, User, ShieldCheck } from 'lucide-react';
import InfoRowWithIcon from '@/components/shared/InfoRowWithIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IListing } from '@/types/listing.interface';
import Image from 'next/image';

interface AdminListingViewDialogProps {
  open: boolean;
  onClose: () => void;
  listing: IListing | null;
}

const AdminListingViewDetailDialog = ({
  open,
  onClose,
  listing,
}: AdminListingViewDialogProps) => {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        {/* Banner Image */}
        <div className="relative h-64 w-full">
            <Image
                src={listing.imageURL || '/placeholder-listing.png'}
                alt={listing.title}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
                 <Badge 
                    variant={listing.active ? 'outline' : 'secondary'} 
                    className={`mb-2 capitalize ${listing.active ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}`}
                 >
                    {listing.active ? 'Active' : 'Inactive'}
                </Badge>
                <DialogTitle className="text-3xl font-bold text-white drop-shadow-md">
                    {listing.title}
                </DialogTitle>
            </div>
        </div>

        <div className="p-6 space-y-8 bg-card">
            {/* Main Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-border">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider text-[10px]">Price</span>
                    <div className="flex items-center gap-1.5 font-semibold text-lg text-foreground">
                        <DollarSign className="h-4 w-4 text-primary" />
                        {listing.price}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider text-[10px]">Duration</span>
                    <div className="flex items-center gap-1.5 font-semibold text-lg text-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        {listing.durationMin}m
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider text-[10px]">Capacity</span>
                    <div className="flex items-center gap-1.5 font-semibold text-lg text-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        {listing.maxGroupSize}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider text-[10px]">Category</span>
                    <div className="flex items-center gap-1.5 font-semibold text-lg text-foreground capitalize">
                        {listing.category.toLowerCase()}
                    </div>
                </div>
            </div>

            {/* Description and Details */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        About this tour
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {listing.description}
                    </p>
                    
                    <div className="flex items-start gap-2 pt-4">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                            <span className="font-medium text-sm">Meeting Point</span>
                            <p className="text-sm text-muted-foreground">{listing.meetingPoint}, {listing.city}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl bg-secondary/30 p-4 border border-border/50">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                            <User className="h-4 w-4" /> Guide Details
                        </h4>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/20">
                                <AvatarImage src={listing.guide?.user?.profilePicUrl} />
                                <AvatarFallback>{listing.guide?.user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{listing.guide?.user?.name}</p>
                                <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                                    <ShieldCheck className="h-3 w-3" /> Verified Guide
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 px-4 bg-background border border-border rounded-lg text-xs font-medium hover:bg-accent transition-colors">
                            View Profile
                        </button>
                    </div>
                    
                    <div className="text-[10px] text-muted-foreground uppercase tracking-tighter text-center">
                        Listing ID: {listing.id}
                    </div>
                </div>
            </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
            >
                Close View
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                Edit Listing
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminListingViewDetailDialog;
