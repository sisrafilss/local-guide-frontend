'use client';
import PaymentCancelContent from '@/components/modules/payment/PaymentCancelContent';
import { Suspense } from 'react';

const PaymentCancelPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
};

export default PaymentCancelPage;
