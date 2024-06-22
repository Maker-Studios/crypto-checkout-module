'use client'

import { CheckedSVG, ContinueSVG, CryptoSVGs, StripeSVG } from '@/components/SVGs'
import { Button } from '@/components/ui/button'
import { CHECKOUTSTEPS } from '@/lib/types'
import { cn } from '@/lib/utils'
import { validate } from 'email-validator'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useAccount } from 'wagmi'

interface ContinuePaymentProps {
  handleStepChange: (step: CHECKOUTSTEPS) => Promise<void>
  stripe?: boolean
  email: string
  onEmailChange: (value: string) => void
  selectedMethod: 'stripe' | 'crypto'
  onMethodSelect: (method: 'stripe' | 'crypto') => void
}

const ContinuePayment = ({
  handleStepChange,
  stripe,
  email,
  onEmailChange,
  selectedMethod,
  onMethodSelect,
}: ContinuePaymentProps) => {
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const account = useAccount()

  const handleContinue = async () => {
    setLoading(true)
    setEmailError('')

    if (!email) {
      setEmailError('Please enter email')

      return
    }

    if (!validate(email.toLowerCase())) {
      setEmailError('Please enter a valid email')
    } else {
      try {
        await handleStepChange(CHECKOUTSTEPS[account.status === 'connected' ? 'select-token' : 'connect-wallet'])
      } catch (error) {
        console.log(`Error getting to the next step`)
      }
    }

    setLoading(false)
  }

  const handleSelect = (option: 'stripe' | 'crypto') => {
    setEmailError('')
    onMethodSelect(option)
  }

  return (
    <motion.div>
      <div className="flex items-center justify-center">
        <ContinueSVG />
      </div>

      <div className="mt-6 space-y-1.5 text-center">
        <h4 className="text-2xl font-bricolage font-semibold">Continue to payment</h4>
        <p className="font-geist text-[#474747]">Enter your email address and select your payment method</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleContinue}>
        <div className="relative">
          {emailError && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-xs p-1 mb-px block font-medium text-red-500 absolute left-0 -top-6"
            >
              {emailError}
            </motion.span>
          )}

          <div
            className={cn(
              'px-2 py-1 border border-[#F0F0F0] rounded-[12px] overflow-hidden transition-all ease-in-out',
              emailError && 'border-red-500'
            )}
            style={{ animationDuration: '200ms' }}
          >
            <label className="text-[#6E6E6E] text-xs font-medium" htmlFor="email">
              Email
            </label>

            <input
              className="block text-[15px] h-9 w-full outline-none font-geist"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                onEmailChange(e.target.value)
                setEmailError('')
              }}
            />
          </div>
        </div>

        {stripe && (
          <label
            htmlFor="stripe"
            className={cn(
              'p-4 border border-[#F0F0F0] rounded-[12px] w-full flex items-center justify-between font-geist text-[13px] font-semibold text-[#737373] transition-all duration-300 ease-in-out overflow-hidden',
              selectedMethod !== 'stripe' ? 'hover:opacity-85' : 'cursor-default'
            )}
            onClick={() => handleSelect('stripe')}
          >
            <input className="hidden" id="stripe" checked={selectedMethod === 'stripe'} readOnly />
            <motion.span className="flex items-center gap-1 overflow-hidden relative">
              <AnimatePresence>
                {selectedMethod === 'stripe' && (
                  <motion.span
                    className="absolute left-0"
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <CheckedSVG />
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.span
                initial={{ paddingLeft: 0 }}
                animate={{ paddingLeft: selectedMethod === 'stripe' ? 20 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                Pay with Card
              </motion.span>
            </motion.span>

            <StripeSVG />
          </label>
        )}

        <label
          htmlFor="crypto"
          className={cn(
            'p-4 border border-[#F0F0F0] rounded-[12px] w-full flex items-center justify-between font-geist text-[13px] font-semibold text-[#737373] transition-all duration-300 ease-in-out overflow-hidden',
            selectedMethod !== 'crypto' ? 'hover:opacity-85' : 'cursor-default'
          )}
          onClick={() => handleSelect('crypto')}
        >
          <input className="hidden" id="crypto" checked={selectedMethod === 'crypto'} readOnly />
          <motion.span className="flex items-center gap-1 overflow-hidden relative">
            <AnimatePresence initial={false}>
              {selectedMethod === 'crypto' && (
                <motion.span
                  className="absolute left-0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <CheckedSVG />
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span
              initial={{ paddingLeft: 20 }}
              animate={{ paddingLeft: selectedMethod === 'crypto' ? 20 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              Pay with Crypto
            </motion.span>
          </motion.span>

          <CryptoSVGs />
        </label>

        <div className="flex items-center justify-center">
          <Button
            className="h-10 px-4 py-3 bg-black text-white inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
            disabled={loading}
            loading={loading}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default ContinuePayment
