'use client';

import PaymentFailContent from '@/components/modules/payment/PaymentFailContent';
import { Suspense } from 'react';

const PaymentFailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailContent />
    </Suspense>
  );
};

export default PaymentFailPage;
