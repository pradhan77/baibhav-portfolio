import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, description, action }) {
  const text = subtitle || description;

  return (
    <div className="section-title pb-8 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-[32px] font-bold font-['Raleway'] text-[#173b6c] tracking-tight mb-0"
        >
          {title}
        </motion.h2>

        {/* Single animated growing blue underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 50 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
          className="h-[3px] bg-[#149ddd] mt-3.5 mb-5"
        />

        {text && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
            className="text-[#45505b] text-base leading-relaxed mb-0 font-['Roboto']"
          >
            {text}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
          className="self-start sm:self-auto flex-shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
