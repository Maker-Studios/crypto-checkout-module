'use client'

import { CHECKOUTSTEPS, PaymentMethodSubmitData, TokenData } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'
import Transactions from './steps/Transactions'
import ConnectWallet from './steps/ConnectWallet'
import ContinuePayment from './steps/ContinuePayment'
import SelectToken from './steps/SelectToken'
import TransactionPending from './steps/TransactionPending'
import TransactionResult from './steps/TransactionResult'
import { useAccount } from 'wagmi'
import { cn } from '@/lib/utils'

interface CheckoutProps {
  title: string
  pricing: number
  stripe?: boolean
  paymentId?: string
  checkoutUID?: string
  vendor: `0x${string}`
  logo: React.ReactNode
  confirmations?: number
  successMessage: string
  onCompleted: () => void
  checkoutContract: `0x${string}`
  pricingDescription: React.ReactNode | string
  onPaymentMethodSubmit: (params: PaymentMethodSubmitData) => Promise<void>
}

const Checkout = ({
  title,
  logo,
  stripe = true,
  vendor,
  pricing,
  onCompleted,
  checkoutUID,
  successMessage,
  checkoutContract,
  confirmations = 1,
  pricingDescription,
  onPaymentMethodSubmit,
}: CheckoutProps) => {
  const [currentStep, setCurrentStep] = useState<CHECKOUTSTEPS>(CHECKOUTSTEPS['continue'])

  const [email, setEmail] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'crypto'>('crypto')
  const [txHash, setTxHash] = useState<`0x${string}`>()
  const [selectedToken, setSelectedToken] = useState<TokenData | undefined>()

  const account = useAccount()

  const [ref, bounds] = useMeasure({ offsetSize: true })

  useEffect(() => {
    if (currentStep > 1 && account.status !== 'connected') {
      setCurrentStep(CHECKOUTSTEPS['connect-wallet'])
    }
  }, [account, currentStep])

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full max-w-[392px] space-y-2"
        >
          <div className="w-full max-w-[392px] border bg-background duration-200 p-0 sm:rounded-[32px]">
            <motion.div
              animate={{ height: bounds.height > 0 ? bounds.height : 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
              className="overflow-hidden w-full"
            >
              <div
                className={cn('w-full', currentStep === CHECKOUTSTEPS['select-token'] ? 'p-2 py-6' : 'p-6')}
                ref={ref}
              >
                {currentStep === CHECKOUTSTEPS.continue && (
                  <ContinuePayment
                    handleStepChange={async (step) => {
                      await onPaymentMethodSubmit({ type: selectedMethod, email })
                      if (selectedMethod !== 'stripe') {
                        setCurrentStep(step)
                      }
                    }}
                    stripe={stripe}
                    email={email}
                    onEmailChange={(value) => setEmail(value)}
                    selectedMethod={selectedMethod}
                    onMethodSelect={(method) => setSelectedMethod(method)}
                  />
                )}

                {currentStep === CHECKOUTSTEPS['connect-wallet'] && (
                  <ConnectWallet
                    handleStepChange={(step) => setCurrentStep(step)}
                    title={title}
                    pricing={pricing}
                    pricingDescription={pricingDescription}
                  />
                )}

                {currentStep === CHECKOUTSTEPS['select-token'] && (
                  <SelectToken
                    logo={logo}
                    pricing={pricing}
                    selectedToken={selectedToken}
                    handleStepChange={(step) => setCurrentStep(step)}
                    handleCoinSelect={(value) => setSelectedToken(value)}
                  />
                )}

                {currentStep === CHECKOUTSTEPS['approve'] && (
                  <Transactions
                    logo={logo}
                    vendor={vendor}
                    amount={pricing}
                    checkoutUID={checkoutUID}
                    confirmations={confirmations}
                    checkoutContract={checkoutContract}
                    onTxHash={(hash) => setTxHash(hash)}
                    spender={account.address as `0x${string}`}
                    selectedToken={selectedToken as TokenData}
                    handleStepChange={(step) => setCurrentStep(step)}
                  />
                )}

                {/* {currentStep === CHECKOUTSTEPS["complete-payment"] && (
                  <CompleteTransaction
                    handleStepChange={(step) => setCurrentStep(step)}
                    pricing={pricing}
                    logo={logo}
                  />
                )} */}

                {currentStep === CHECKOUTSTEPS['transaction-pending'] && (
                  <TransactionPending
                    confirmations={confirmations}
                    txHash={txHash as `0x${string}`}
                    handleStepChange={(step) => setCurrentStep(step)}
                  />
                )}

                {currentStep === CHECKOUTSTEPS['transaction-result'] && (
                  <TransactionResult
                    logo={logo}
                    title={title}
                    pricing={pricing}
                    successMsg={successMessage}
                    onCompleted={() => onCompleted()}
                    selectedToken={selectedToken as TokenData}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Checkout
