import { useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import tokens from '@/lib/tokens'

const useChainStables = () => {
  const [chainStables, setChainStables] = useState<{ address: `0x${string}`; name: string; chainId: number }[]>([])
  const chainId = useChainId()

  useEffect(() => {
    if ((tokens as any)[chainId]) {
      const chainCoins = (tokens as any)[chainId]
      const stables = Object.keys(chainCoins).map((i) => ({ address: chainCoins[i], name: i, chainId }))
      setChainStables(stables)
    } else {
      setChainStables([])
    }
  }, [chainId])

  return chainStables
}

export default useChainStables
