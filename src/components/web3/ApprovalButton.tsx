'use client'

import { Button } from '@/components/ui/button'

const ApprovalButton = ({
  loading,
  handleCheckout,
  requiresApproval,
  approvalCheckCompleted,
  handleApproveTransaction,
}: {
  loading: boolean
  requiresApproval: boolean
  handleCheckout: () => void
  approvalCheckCompleted: boolean
  handleApproveTransaction: () => void
}) => {
  if (!approvalCheckCompleted) {
    return null
  }

  return (
    <Button
      className="h-10 px-4 py-3 bg-black text-white inline-flex items-center justify-center text-[13px] rounded-[32px] hover:opacity-85 transition-all duration-300 ease-in-out font-medium"
      onClick={requiresApproval ? handleApproveTransaction : handleCheckout}
      loading={loading}
      disabled={loading}
    >
      {requiresApproval ? (!loading ? 'Approve' : 'Approving...') : !loading ? 'Confirm' : 'Confirming...'}
    </Button>
  )
}

export default ApprovalButton
