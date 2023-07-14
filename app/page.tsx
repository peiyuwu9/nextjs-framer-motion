"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const link = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { ease: "easeInOut" } },
};

function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <motion.div
          className="flex justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.a
            href={"/form/list"}
            className="card"
            variants={link}
            whileHover={{ scale: 1.05 }}
          >
            Form
          </motion.a>
          <motion.a
            href={"/brief/list"}
            className="card"
            variants={link}
            whileHover={{ scale: 1.05 }}
          >
            Brief
          </motion.a>
        </motion.div>
      </>
    )
  );
}

export default Home;
