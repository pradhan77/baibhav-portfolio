/**
 * Framer Motion Animation Variants
 * Sourced from Space Portfolio foundation for staggered reveals & space transitions
 */

export function slideInFromLeft(delay = 0) {
  return {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}

export function slideInFromRight(delay = 0) {
  return {
    hidden: { x: 80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}

export const slideInFromTop = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function fadeIn(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
}
