'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import PaymentSuccessContent from '@/components/modules/payment/PaymentSuccessContent';
import { Suspense } from 'react';

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollReveal variant="zoom-in" className="w-full">
        <PaymentSuccessContent />
      </ScrollReveal>
    </Suspense>
  );
};

export default PaymentSuccessPage;
