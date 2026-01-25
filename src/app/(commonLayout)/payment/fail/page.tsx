'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const transactionId = searchParams.get('transactionId');
  const message = searchParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>

          <CardTitle className="text-2xl font-semibold">
            Payment Failed
          </CardTitle>

          <Badge className="mx-auto bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            Failed
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {message ||
              'Unfortunately, your payment could not be completed. Please try again or contact support if the issue persists.'}
          </p>

          <Separator />

          {transactionId && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-medium break-all">{transactionId}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={() => router.push('/dashboard/my-booking')}
          >
            Go to My Bookings
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
