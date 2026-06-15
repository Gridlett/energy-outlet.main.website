'use client'

import React, { useRef, useState, useEffect } from 'react'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function OTPInput({ length = 6, value, onChange, disabled = false }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Sync external value with local state
  useEffect(() => {
    const otpArray = value.split('').slice(0, length)
    const newOtp = [...new Array(length).fill('')]
    otpArray.forEach((char, index) => {
      newOtp[index] = char
    })
    setOtp(newOtp)
  }, [value, length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    // Allow digits only
    if (val && isNaN(Number(val))) return

    const newOtp = [...otp]
    // Only take the last character entered
    newOtp[index] = val.substring(val.length - 1)
    setOtp(newOtp)
    onChange(newOtp.join(''))

    // Move to next input if value is entered
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Clear previous box and focus it
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
      onChange(newOtp.join(''))
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text').trim()
    if (isNaN(Number(data))) return

    const pasteData = data.split('').slice(0, length)
    const newOtp = [...otp]
    pasteData.forEach((char, index) => {
      newOtp[index] = char
    })
    setOtp(newOtp)
    onChange(newOtp.join(''))

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pasteData.length, length - 1)
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div onPaste={handlePaste} className="flex gap-2 sm:gap-3.5 justify-center mt-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          maxLength={1}
          autoComplete="one-time-code"
          inputMode="numeric"
          className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-extrabold text-white rounded-xl bg-slate-900/50 border border-slate-700/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 disabled:opacity-50"
        />
      ))}
    </div>
  )
}
