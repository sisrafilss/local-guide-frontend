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
import { updateAdmin } from '@/services/admin/adminManagement';
import { IAdmin } from '@/types/admin.interface';
import { useActionState, useRef } from 'react';

interface IAdminFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admin?: IAdmin;
}

const AdminFormDialog = ({
  open,
  onClose,
  onSuccess,
  admin,
}: IAdminFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    updateAdmin.bind(null, admin?.id as string),
    null
  );

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Edit Admin</DialogTitle>
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
                defaultValue={state?.formData?.name || admin?.name || ''}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                defaultValue={state?.formData?.email || admin?.email || ''}
                disabled
              />
              <InputFieldError field="email" state={state} />
            </Field>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-muted">
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

export default AdminFormDialog;
