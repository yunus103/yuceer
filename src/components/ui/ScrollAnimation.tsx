'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number // Delay in seconds (multiplied by 0.1 usually, or just seconds)
}

const MotionDiv = motion.create('div')

export default function ScrollAnimation({ children, className, delay = 0 }: ScrollAnimationProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionDiv>
  )
}
