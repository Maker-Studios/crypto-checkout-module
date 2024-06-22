'use client'

import { CHECKOUTSTEPS } from '@/lib/types'
import { motion } from 'framer-motion'

import { ApproveCompleteSVG } from '@/components/SVGs'

interface CompleteTransactionProps {
  handleStepChange: (step: CHECKOUTSTEPS) => void
  pricing: string
  logo: React.ReactNode
}

const CompleteTransaction = ({ handleStepChange, pricing, logo }: CompleteTransactionProps) => {
  return (
    <motion.div>
      <div className="flex items-center justify-center">
        <ApproveCompleteSVG />
      </div>

      <div className="mt-6 space-y-1.5 text-center">
        <h4 className="text-2xl font-bricolage font-semibold">Complete payment</h4>
        <p className="font-geist text-[#474747]">Check your wallet and approve this spending</p>
      </div>

      <div className="mt-4 mb-8 space-y-4">
        <div
          className="p-4 border border-[#F0F0F0] rounded-[24px] bg-[#1E1E1E] text-white font-geist font-medium flex flex-col gap-8 relative overflow-hidden"
          style={{ boxShadow: '0px 15px 15px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <p className="text-[13px] text-[#CCC]">Amount to pay:</p>

          <div>
            <p className="text-[#C4C4C4] text-[24px]">{pricing}</p>
            <p className="text-[13px] text-[#6F6F6F]">20,000 USDC</p>
          </div>

          <span className="top-4 right-4 absolute">{logo}</span>

          <svg
            width={120}
            height={101}
            viewBox="0 0 120 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 bottom-0"
          >
            <mask
              id="mask0_863_2893"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={120}
              height={121}
            >
              <rect y="0.166504" width={120} height={120} fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_863_2893)">
              <path
                d="M25 80.1665V55.1665C25 53.7498 25.4792 52.5623 26.4375 51.604C27.3958 50.6457 28.5833 50.1665 30 50.1665C31.4167 50.1665 32.6042 50.6457 33.5625 51.604C34.5208 52.5623 35 53.7498 35 55.1665V80.1665C35 81.5832 34.5208 82.7707 33.5625 83.729C32.6042 84.6873 31.4167 85.1665 30 85.1665C28.5833 85.1665 27.3958 84.6873 26.4375 83.729C25.4792 82.7707 25 81.5832 25 80.1665ZM55 80.1665V55.1665C55 53.7498 55.4792 52.5623 56.4375 51.604C57.3958 50.6457 58.5833 50.1665 60 50.1665C61.4167 50.1665 62.6042 50.6457 63.5625 51.604C64.5208 52.5623 65 53.7498 65 55.1665V80.1665C65 81.5832 64.5208 82.7707 63.5625 83.729C62.6042 84.6873 61.4167 85.1665 60 85.1665C58.5833 85.1665 57.3958 84.6873 56.4375 83.729C55.4792 82.7707 55 81.5832 55 80.1665ZM105 40.1665H14.5C13.25 40.1665 12.1875 39.729 11.3125 38.854C10.4375 37.979 10 36.9165 10 35.6665V32.9165C10 31.9998 10.2292 31.2082 10.6875 30.5415C11.1458 29.8748 11.75 29.3332 12.5 28.9165L55.5 7.4165C56.9167 6.74984 58.4167 6.4165 60 6.4165C61.5833 6.4165 63.0833 6.74984 64.5 7.4165L107.25 28.7915C108.167 29.2082 108.854 29.8332 109.313 30.6665C109.771 31.4998 110 32.3748 110 33.2915V35.1665C110 36.5832 109.521 37.7707 108.562 38.729C107.604 39.6873 106.417 40.1665 105 40.1665ZM15 105.167C13.5833 105.167 12.3958 104.687 11.4375 103.729C10.4792 102.771 10 101.583 10 100.167C10 98.7498 10.4792 97.5623 11.4375 96.604C12.3958 95.6457 13.5833 95.1665 15 95.1665H65.25C66.6667 95.1665 67.8542 95.6457 68.8125 96.604C69.7708 97.5623 70.25 98.7498 70.25 100.167C70.25 101.583 69.7708 102.771 68.8125 103.729C67.8542 104.687 66.6667 105.167 65.25 105.167H15ZM90 63.9165C88.5833 63.9165 87.3958 63.4373 86.4375 62.479C85.4792 61.5207 85 60.3332 85 58.9165V55.1665C85 53.7498 85.4792 52.5623 86.4375 51.604C87.3958 50.6457 88.5833 50.1665 90 50.1665C91.4167 50.1665 92.6042 50.6457 93.5625 51.604C94.5208 52.5623 95 53.7498 95 55.1665V58.9165C95 60.3332 94.5208 61.5207 93.5625 62.479C92.6042 63.4373 91.4167 63.9165 90 63.9165ZM80 92.9165V83.2915C80 82.3748 80.2292 81.4998 80.6875 80.6665C81.1458 79.8332 81.8333 79.2082 82.75 78.7915L97.75 71.2915C98.4167 70.8748 99.1667 70.6665 100 70.6665C100.833 70.6665 101.583 70.8748 102.25 71.2915L117.25 78.7915C118.167 79.2082 118.854 79.8332 119.313 80.6665C119.771 81.4998 120 82.3748 120 83.2915V92.9165C120 99.1665 118.375 104.562 115.125 109.104C111.875 113.646 107.458 117.083 101.875 119.417C101.708 119.5 101.083 119.625 100 119.792C99.8333 119.792 99.2083 119.667 98.125 119.417C92.5417 117.083 88.125 113.646 84.875 109.104C81.625 104.562 80 99.1665 80 92.9165ZM96.375 94.5415L94.125 92.2915C93.375 91.5415 92.5 91.1873 91.5 91.229C90.5 91.2707 89.625 91.6665 88.875 92.4165C88.125 93.1665 87.75 94.0415 87.75 95.0415C87.75 96.0415 88.125 96.9165 88.875 97.6665L92.875 101.667C93.875 102.667 95.0417 103.167 96.375 103.167C97.7083 103.167 98.875 102.667 99.875 101.667L111.125 90.5415C111.875 89.7915 112.25 88.9165 112.25 87.9165C112.25 86.9165 111.875 86.0415 111.125 85.2915C110.375 84.5415 109.5 84.1873 108.5 84.229C107.5 84.2707 106.625 84.6248 105.875 85.2915L96.375 94.5415Z"
                fill="#363636"
              />
            </g>
          </svg>
        </div>

        <div className="text-center font-geist text-[13px] text-[#0094FF]">
          <p>Approval tx: 0x3456....90876</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          className="h-10 px-4 py-3 bg-[#F3F3F3] text-black inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
          onClick={() => handleStepChange(CHECKOUTSTEPS.continue)}
        >
          Back
        </button>

        <button
          className="h-10 px-4 py-3 bg-black text-white inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
          onClick={() => handleStepChange(CHECKOUTSTEPS['transaction-pending'])}
        >
          Checkout
        </button>
      </div>
    </motion.div>
  )
}

export default CompleteTransaction
