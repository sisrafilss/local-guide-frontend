'use client';

import PaymentSuccessContent from '@/components/modules/payment/PaymentSuccessContent';
import { Suspense } from 'react';

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
