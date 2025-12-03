"use client";

import { motion, type Variants } from "motion/react";

const drawFirst: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        type: "spring",
        duration: 2,
        bounce: 0,
        delay: 0.8,
      },
      opacity: {
        duration: 0.01,
        delay: 0.8,
      },
    },
  },
};

const drawSecond: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        type: "spring",
        duration: 0.8,
        bounce: 0,
        delay: 1.8,
      },
      opacity: {
        duration: 0.01,
        delay: 1.8,
      },
    },
  },
};

export const AnimatedArrow = () => {
  return (
    <motion.svg
      //   width="158"
      //   height="652"
      viewBox="0 0 158 652"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="size-60 stroke-10 stroke-slate-950 dark:stroke-slate-200"
    >
      <motion.path
        d="M88.4323 10C88.4323 14.2059 88.4323 22.9214 87.5731 38.9155C86.4068 60.6259 81.2667 79.8583 75.381 123.75C70.4294 160.676 65.6166 227.845 59.8235 272.503C51.3479 337.84 41.2875 360.521 37.6382 364.668C35.7172 366.852 32.4505 367.965 29.6466 367.64C23.8034 366.963 19.0819 357.868 14.8369 348.724C4.70257 326.893 12.6638 290.358 19.0293 273.311C21.9463 265.499 27.8179 261.457 32.8821 258.26C39.024 254.384 46.4228 254.199 52.1504 254.617C64.8922 255.545 86.6486 283.896 108.837 335.805C116.348 353.377 118.626 378.711 121.147 407.562C123.667 436.413 123.667 468.942 122.882 492.471C121.642 529.596 112.712 561.892 102.259 591.811C94.1718 614.958 87.3393 625.278 82.9498 632.259C74.7612 618.597 69.1481 600.259 64.0776 584.652C61.3473 575.459 58.2979 563.685 54.2882 545.494"
        // stroke="black"
        // strokeWidth="20"
        strokeLinecap="round"
        variants={drawFirst}
        // className="stroke-9 stroke-slate-800 dark:stroke-slate-200"
      />
      <motion.path
        d="M87.2585 639.959C87.2585 640.526 93.9738 639.207 105.756 635.958C110.824 634.322 114.039 632.71 119.961 629.137C125.882 625.564 134.411 620.079 147.496 611.824"
        // stroke="black"
        // strokeWidth="20"
        strokeLinecap="round"
        variants={drawSecond}
        // className="stroke-9 stroke-slate-800 dark:stroke-slate-200"
      />
    </motion.svg>
  );
};
