'use client';

import Link from 'next/link';
import SignUpForm from './signup-form';
import { motion } from 'framer-motion';

export default function SignUpViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Panel */}
      <div className="relative hidden h-full flex-col bg-[#084C61] p-10 text-white/90 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-[#084C61] to-[#4F6D7A]/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-8 w-8"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-2xl font-bold">KAM</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-20 mt-auto"
        >
          <blockquote className="space-y-4">
            <p className="text-xl text-white/90">
              &ldquo;Create an account to start managing your restaurant leads
              efficiently.&rdquo;
            </p>
            <footer className="text-sm font-medium text-white/70">
              - Key Account Management System
            </footer>
          </blockquote>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#084C61] via-[#2A5D6F] to-[#4F6D7A] p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md space-y-8"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg">
            <div className="flex flex-col space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white/95">
                Create Account
              </h1>
              <p className="text-[#B8C4C9]">
                Enter your details to get started
              </p>
            </div>
            <SignUpForm />
            <div className="mt-6 text-center text-sm text-[#94A7AF]">
              <p>
                Already have an account?{' '}
                <Link
                  href="/"
                  className="font-medium text-[#B8C4C9] transition-colors hover:text-white/90"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
