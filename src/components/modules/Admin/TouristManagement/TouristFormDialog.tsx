import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateTourist } from '@/services/admin/touristsManagement';
import { ITourist } from '@/types/tourist.interface';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ITouristFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tourist?: ITourist;
}

const TouristFormDialog = ({
  open,
  onClose,
  onSuccess,
  tourist,
}: ITouristFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    updateTourist.bind(null, tourist?.id as string),
    null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle success/error from server
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Operation successful');
      if (formRef.current) {
        formRef.current.reset();
      }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Tourist</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Basic Information */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={state?.formData?.name || tourist?.name || ''}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tourist@example.com"
                defaultValue={state?.formData?.email || tourist?.email || ''}
                disabled
              />
              <InputFieldError field="email" state={state} />
            </Field>
          </div>

          {/* <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={
                  state?.formData?.contactNumber || tourist?.contactNumber || ''
                }
              />
              <InputFieldError field="contactNumber" state={state} />
            </Field> */}
          {/* 
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formData?.address || tourist?.address || ''
                }
              />
              <InputFieldError field="address" state={state} />
            </Field> */}
          {/* </div> */}

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TouristFormDialog;
