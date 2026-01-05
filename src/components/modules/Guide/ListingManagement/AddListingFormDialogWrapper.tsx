'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import AddListingFormDialog from './AddListingFormDialog';

const AddListingFormDialogWrapper = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [addingListing, setAddingListing] = useState<boolean>(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div>
      <Button onClick={() => setAddingListing(true)}>Add New Listing</Button>
      <AddListingFormDialog
        open={!!addingListing}
        onClose={() => setAddingListing(false)}
        onSuccess={() => {
          setAddingListing(false);
          handleRefresh();
        }}
      />
    </div>
  );
};

export default AddListingFormDialogWrapper;
