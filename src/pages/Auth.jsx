import React from 'react';
import { AuthUI } from '../components/UI/AuthUI';
import { motion } from 'framer-motion';

export default function Auth() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AuthUI />
    </motion.div>
  );
}
