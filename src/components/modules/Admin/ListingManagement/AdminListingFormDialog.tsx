'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IListing, ListingCategory } from '@/types/listing.interface';
import { useState } from 'react';
import { toast } from 'sonner';

interface AdminListingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  listing?: IListing;
}

const AdminListingFormDialog = ({
  open,
  onClose,
  onSuccess,
  listing,
}: AdminListingFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    toast.success('Listing updated successfully (Admin Mockup Mode)');
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle>{listing ? 'Edit Listing (Admin)' : 'Create Listing'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            <div className="grid md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={listing?.title ?? ''}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={listing?.city ?? ''}
                    required
                  />
                </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={listing?.description ?? ''}
                required
              />
            </Field>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field>
                  <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={listing?.price ?? ''}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="durationMin">Duration (min)</FieldLabel>
                  <Input
                    id="durationMin"
                    name="durationMin"
                    type="number"
                    defaultValue={listing?.durationMin ?? ''}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="maxGroupSize">Max Size</FieldLabel>
                  <Input
                    id="maxGroupSize"
                    name="maxGroupSize"
                    type="number"
                    defaultValue={listing?.maxGroupSize ?? 1}
                    required
                  />
                </Field>
                <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <select
                        id="category"
                        name="category"
                        defaultValue={listing?.category ?? 'CUSTOM'}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {Object.values(ListingCategory).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input
                id="meetingPoint"
                name="meetingPoint"
                defaultValue={listing?.meetingPoint ?? ''}
                required
              />
            </Field>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-start gap-3">
                <div className="text-yellow-500 font-bold text-lg leading-none pt-1">!</div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400">
                    <p className="font-semibold mb-1">Admin Notice:</p>
                    Changing these fields will directly affect the guide's listing. Guides will be notified of any administrative changes.
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-muted/30 px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Changes...' : 'Save Administrative Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminListingFormDialog;
