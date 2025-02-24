"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="h-20 w-20 rounded-full bg-primary flex items-center justify-center"
          animate={{
            rotate: 360,
            transition: { repeat: Infinity, duration: 2, ease: "linear" }
          }}
        >
          <img
            src="https://i.imgur.com/dHEVwPc.png"
            alt="NoteDrop Icon"
            className="h-25 w-25 object-contain"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="text-1.5xl font-semibold text-center text-primary animate-pulse"
        >
          www.notedrop.xyz
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-lg text-gray-500"
        >
          Loading the future of crypto airdrops...
        </motion.p>
      </div>
    </motion.div>
  )
}
