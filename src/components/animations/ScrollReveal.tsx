'use client';

import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  TargetAndTransition,
  Variants,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ReactNode } from 'react';

type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'pop'
  | 'blur-up';

type ScrollRevealProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'whileInView' | 'viewport' | 'variants'
> & {
  children: ReactNode;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
  delay?: number;
  duration?: number;
};

type ScrollStaggerProps = Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'whileInView' | 'viewport' | 'variants'
> & {
  children: ReactNode;
  once?: boolean;
  amount?: number;
  delay?: number;
  stagger?: number;
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const hiddenStates: Record<RevealVariant, TargetAndTransition> = {
  'fade-up': { opacity: 0, y: 40 },
  'fade-down': { opacity: 0, y: -36 },
  'fade-left': { opacity: 0, x: -48 },
  'fade-right': { opacity: 0, x: 48 },
  'zoom-in': { opacity: 0, scale: 0.92 },
  pop: { opacity: 0, y: 24, scale: 0.95 },
  'blur-up': { opacity: 0, y: 30, filter: 'blur(8px)' },
};

const visibleState: TargetAndTransition = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  filter: 'blur(0px)',
};

function buildVariants(
  variant: RevealVariant,
  duration: number,
  delay: number
): Variants {
  return {
    hidden: hiddenStates[variant],
    visible: {
      ...visibleState,
      transition: {
        duration,
        delay,
        ease: EASE_OUT,
      },
    },
  };
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  once = true,
  amount = 0.25,
  delay = 0,
  duration = 0.65,
  className,
  ...rest
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={buildVariants(variant, duration, delay)}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({
  children,
  once = true,
  amount = 0.2,
  delay = 0,
  stagger = 0.12,
  className,
  ...rest
}: ScrollStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type ScrollStaggerItemProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'whileInView' | 'viewport'
> & {
  children: ReactNode;
  variant?: RevealVariant;
  duration?: number;
};

export function ScrollStaggerItem({
  children,
  variant = 'fade-up',
  duration = 0.55,
  className,
  ...rest
}: ScrollStaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={buildVariants(variant, duration, 0)}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
