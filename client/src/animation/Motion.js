export const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,

    },
  },
};
export const backgroundVariants = {
  moving: {
    backgroundImage: [
      "linear-gradient(to top right, #06b6d4, #3b82f6, #1d4ed8)", // cyan-500, blue-500, blue-700
      "linear-gradient(to top right, #3b82f6, #06b6d4, #1d4ed8)", // blue-500, cyan-500, blue-700
      "linear-gradient(to top right, #1d4ed8, #3b82f6, #06b6d4)", // blue-700, blue-500, cyan-500
    ],
    transition: {
      duration: 5, // Duration for each gradient animation
      repeat: Infinity,
      repeatType: "reverse", // Repeat infinitely
      ease: "linear", // Linear easing for a smooth effect
    },
  },
};
export const divVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};
export const ModalVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: .3,
      ease: "linear"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "linear"
    },
  }
};
export const scrollAnimation = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 25 },
  },
};
