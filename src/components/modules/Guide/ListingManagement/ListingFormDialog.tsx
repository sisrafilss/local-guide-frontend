'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateListing } from '@/services/guide/listingManagement';
import { IListing, ListingCategory } from '@/types/listing.interface';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
  Edit3, 
  MapPin, 
  Tag, 
  Users, 
  Clock, 
  DollarSign, 
  Image as ImageIcon,
  Type,
  FileText,
  Save,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IListingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  listing?: IListing;
}

const ListingFormDialog = ({
  open,
  onClose,
  onSuccess,
  listing,
}: IListingFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    updateListing.bind(null, listing?.id as string),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Listing updated successfully');
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[92vh] flex flex-col p-0 border-border/40 shadow-2xl rounded-3xl bg-background/95 backdrop-blur-xl overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-6 bg-sky-500/5 border-b border-sky-500/10">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                <Edit3 className="h-6 w-6" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black tracking-tight text-foreground">Edit Listing</DialogTitle>
                <p className="text-xs font-semibold text-muted-foreground mt-1 opacity-70">Update the details of your current listing</p>
             </div>
          </div>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8 custom-scrollbar">
            
            {/* Core Info Section */}
            <div className="grid grid-cols-1 gap-6">
               <div className="space-y-2.5 group">
                 <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
                 <div className="relative">
                    <Input id="title" name="title" defaultValue={listing?.title} placeholder="Visiting the hidden gems of Old Dhaka" className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-medium" />
                    <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>

               <div className="space-y-2.5 group">
                 <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                 <div className="relative">
                    <Textarea id="description" name="description" defaultValue={listing?.description} placeholder="Update the trip narrative..." rows={4} className="bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 pt-3 font-medium resize-none min-h-[120px]" />
                    <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
               <div className="space-y-2.5 group">
                 <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Price (BDT)</Label>
                 <div className="relative">
                    <Input id="price" name="price" type="number" step="1" defaultValue={listing?.price} placeholder="2500" className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-bold" />
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>

               <div className="space-y-2.5 group">
                 <Label htmlFor="durationMin" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Duration (minutes)</Label>
                 <div className="relative">
                    <Input id="durationMin" name="durationMin" type="number" defaultValue={listing?.durationMin} placeholder="180" className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-bold" />
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>

               <div className="space-y-2.5 group">
                 <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                 <div className="relative">
                    <select id="category" name="category" defaultValue={listing?.category || 'CUSTOM'} className="w-full h-12 bg-muted/30 border border-border/40 focus:ring-2 focus:ring-sky-500/20 transition-all rounded-xl pl-10 pr-4 text-sm font-bold appearance-none cursor-pointer outline-none">
                       {Object.values(ListingCategory).map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                       ))}
                    </select>
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
                 </div>
               </div>

               <div className="space-y-2.5 group">
                 <Label htmlFor="maxGroupSize" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Max Group Size</Label>
                 <div className="relative">
                    <Input id="maxGroupSize" name="maxGroupSize" type="number" defaultValue={listing?.maxGroupSize || 1} className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-bold" />
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>
            </div>

            {/* Geographical Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
               <div className="space-y-2.5 group">
                 <Label htmlFor="meetingPoint" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Meeting Point</Label>
                 <div className="relative">
                    <Input id="meetingPoint" name="meetingPoint" defaultValue={listing?.meetingPoint} placeholder="Sadarghat Terminal entrance" className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-medium" />
                    <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>

               <div className="space-y-2.5 group">
                 <Label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">City</Label>
                 <div className="relative">
                    <Input id="city" name="city" defaultValue={listing?.city} placeholder="Dhaka" className="h-12 bg-muted/30 border-border/40 focus:ring-sky-500/20 transition-all rounded-xl pl-10 font-medium" />
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-sky-500 transition-colors" />
                 </div>
               </div>
            </div>

            {/* Visual File Upload */}
            <div className="space-y-3 pt-2">
               <Label htmlFor="picture" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Picture</Label>
               <div className="p-8 rounded-3xl border-2 border-dashed border-border/40 bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer group/upload relative overflow-hidden">
                  <Input id="picture" name="photo" type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="flex flex-col items-center justify-center gap-3 relative z-0">
                     <div className="p-4 rounded-2xl bg-background border shadow-sm transition-transform group-hover/upload:scale-110">
                        <ImageIcon className="h-6 w-6 text-sky-500" />
                     </div>
                     <div className="text-center">
                        <p className="text-sm font-bold text-foreground">Update Listing Image</p>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground/60 mt-0.5">Recommended resolution: 1200x800px</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-muted/30 border-t border-border/40 flex items-center justify-between gap-4">
            <button type="button" onClick={handleClose} className="px-6 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-sky-500 transition-all">
               Cancel
            </button>

            <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-lg shadow-sky-500/20 bg-sky-500 hover:bg-sky-600 transition-all hover:scale-[1.02] active:scale-[0.98] group/btn">
              <AnimatePresence mode="wait">
                 {isPending ? (
                    <motion.div key="loading" className="flex items-center gap-2">
                       <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Updating...
                    </motion.div>
                 ) : (
                    <motion.div key="idle" className="flex items-center gap-2">
                       <Save className="h-4 w-4 mr-1" />
                       Save Changes
                    </motion.div>
                 )}
              </AnimatePresence>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListingFormDialog;
