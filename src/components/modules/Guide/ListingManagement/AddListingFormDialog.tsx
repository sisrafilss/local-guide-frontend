'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createListing } from '@/services/guide/listingManagement';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface IAddListingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddListingFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IAddListingFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<
    { success: boolean; message?: string } | null,
    FormData
  >(createListing, null);

  // Handle success / error
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Listing created successfully');
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
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">Add New Listing</DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Scrollable Content */}
          <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Visiting the old dhaka"
              />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a few words about the trip"
                rows={4}
              />
            </Field>

            {/* Price */}
            <Field>
              <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="25"
              />
            </Field>

            {/* Duration */}
            <Field>
              <FieldLabel htmlFor="durationMin">Duration (minutes)</FieldLabel>
              <Input
                id="durationMin"
                name="durationMin"
                type="number"
                placeholder="120"
              />
            </Field>

            {/* Meeting Point */}
            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input
                id="meetingPoint"
                name="meetingPoint"
                placeholder="Sadarghat Launch Terminal"
              />
            </Field>

            {/* City */}
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" name="city" placeholder="Dhaka" />
            </Field>

            {/* Max Group Size */}
            <Field>
              <FieldLabel htmlFor="maxGroupSize">Max Group Size</FieldLabel>
              <Input
                id="maxGroupSize"
                name="maxGroupSize"
                type="number"
                placeholder="1"
                defaultValue={1}
              />
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                id="category"
                name="category"
                defaultValue="CUSTOM"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="FOOD">Food</option>
                <option value="HISTORY">History</option>
                <option value="PHOTOGRAPHY">Photography</option>
                <option value="ADVENTURE">Adventure</option>
                <option value="NIGHTLIFE">Nightlife</option>
                <option value="SHOPPING">Shopping</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </Field>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t border-border bg-muted px-6 py-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingFormDialog;
