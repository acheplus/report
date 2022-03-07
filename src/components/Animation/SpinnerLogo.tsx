import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Logo } from "../Sidebar/Logo";

const MotionBox = motion(Box)

export function SpinnerLogo () {
    return (
      <MotionBox as='aside'
        bg='red'
        drag='x'
        dragConstraints={{ left: -100, right: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        justify="center"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"]
        }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1
      }}
      padding="4"
      bgGradient="linear(to-l, #1b9b4e, #1bbbbb)"
      width="7.5em"
      height="7.5em"
      display="flex"
      >
        <Logo></Logo>
      </MotionBox>
    )
}