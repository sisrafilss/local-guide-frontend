'use client';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import PaymentCancelContent from '@/components/modules/payment/PaymentCancelContent';
import { Suspense } from 'react';

const PaymentCancelPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollReveal variant="pop" className="w-full">
        <PaymentCancelContent />
      </ScrollReveal>
    </Suspense>
  );
};

export default PaymentCancelPage;
