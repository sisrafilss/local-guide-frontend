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
import { CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const transactionId = searchParams.get('transactionId');
  const message = searchParams.get('message');
  const amount = searchParams.get('amount');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>

          <CardTitle className="text-2xl font-semibold">
            Payment Successful
          </CardTitle>

          <Badge className="mx-auto bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {message || 'Your booking has been confirmed successfully.'}
          </p>

          <Separator />

          <div className="space-y-2 text-sm">
            {transactionId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium break-all">{transactionId}</span>
              </div>
            )}

            {amount && amount !== 'undefined' && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">৳ {amount}</span>
              </div>
            )}
          </div>
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
