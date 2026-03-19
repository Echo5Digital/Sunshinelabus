'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const ShimmerButton = forwardRef(
  (
    {
      children,
      className = '',
      type = 'button',
      shimmerColor = 'rgba(255,255,255,0.35)',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={[
          'relative inline-flex items-center overflow-hidden',
          'hover:scale-105 transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B7DBF] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          className,
        ].join(' ')}
        {...props}
      >
        {!disabled && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${shimmerColor} 50%, transparent 70%)`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              repeat: Infinity,
              repeatDelay: 1.2,
              duration: 1.4,
              ease: 'easeInOut',
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
export { ShimmerButton };
