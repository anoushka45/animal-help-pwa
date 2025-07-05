'use client'

import { useState } from 'react'
import Link from 'next/link'

const images = [
  'https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1667099521892-b9d832b74873?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full">
      <div className="relative h-56 md:h-96 overflow-hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover z-0"
            />

            {/* Overlay Content ONLY on the first slide */}
            {index === 0 && currentIndex === 0 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-start px-6 z-10">
    <div className="relative z-20 text-white max-w-sm space-y-4">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    Welcome to Animal<span className="text-purple-300">Aid</span> 🐾
                  </h2>
                  <p className="text-sm md:text-base">
                    Join us in helping rescue, foster, or adopt pets. Be part of the change.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block px-4 py-2 bg-white text-purple-700 rounded-md shadow-md font-semibold hover:bg-purple-100 transition"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1 1 5l4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 9 4-4-4-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}
