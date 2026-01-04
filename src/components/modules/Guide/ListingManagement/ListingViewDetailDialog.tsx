import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Clock, DollarSign, MapPin, Users } from 'lucide-react';

import InfoRowWithIcon from '@/components/shared/InfoRowWithIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IListing } from '@/types/listing.interface';

interface IListingViewDialogProps {
  open: boolean;
  onClose: () => void;
  listing: IListing | null;
}

const ListingViewDetailDialog = ({
  open,
  onClose,
  listing,
}: IListingViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DialogTitle className="text-2xl font-semibold">
              {listing?.title ?? '—'}
            </DialogTitle>
            <div className="mr-5">
              <span className="font-bold">Category:</span>{' '}
              <Badge variant="secondary"> {listing?.category ?? '—'}</Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="grid grid-cols-1 gap-8 px-6 py-6 md:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-5">
            {/* Image */}
            <div className="h-64 w-full overflow-hidden rounded-xl bg-muted">
              {listing?.images?.length ? (
                <img
                  src={listing?.images?.[0]?.url}
                  alt={listing?.title ?? 'Listing image'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Tour Description
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {listing?.description ?? 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Info */}
            <div className="space-y-4 rounded-xl border p-5">
              <InfoRowWithIcon
                icon={<Clock className="h-5 w-5" />}
                label="Duration"
                value={
                  listing?.durationMin ? `${listing?.durationMin} minutes` : '—'
                }
              />

              <InfoRowWithIcon
                icon={<Users className="h-5 w-5" />}
                label="Group Size"
                value={
                  listing?.maxGroupSize
                    ? `Max ${listing?.maxGroupSize} ${
                        listing?.maxGroupSize > 1 ? 'people' : 'person'
                      }`
                    : '—'
                }
              />

              <InfoRowWithIcon
                icon={<MapPin className="h-5 w-5" />}
                label="Meeting Point"
                value={
                  listing?.meetingPoint
                    ? `${listing?.meetingPoint}, ${listing?.city ?? ''}`
                    : '—'
                }
              />

              <InfoRowWithIcon
                icon={<DollarSign className="h-5 w-5" />}
                label="Price"
                value={listing?.price ? `$${listing?.price}` : '—'}
              />
            </div>

            {/* Guide */}
            <div className="rounded-xl border p-5">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Tour Guide
              </h4>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={listing?.guide?.user?.profilePicUrl ?? ''}
                  />
                  <AvatarFallback>
                    {listing?.guide?.user?.name?.charAt(0) ?? 'G'}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">
                    {listing?.guide?.user?.name ?? 'Unknown Guide'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified Guide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingViewDetailDialog;
