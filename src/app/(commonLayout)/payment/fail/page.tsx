'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import PaymentFailContent from '@/components/modules/payment/PaymentFailContent';
import { Suspense } from 'react';

const PaymentFailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollReveal variant="fade-down" className="w-full">
        <PaymentFailContent />
      </ScrollReveal>
    </Suspense>
  );
};

export default PaymentFailPage;
