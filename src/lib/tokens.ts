import { mainnet, optimism, sepolia, hardhat, arbitrum } from 'wagmi/chains'
import { DAILogo, USDCLogo, USDTLogo } from '@/components/SVGs'

export const tokenIcons = {
  USDC: USDCLogo,
  USDT: USDTLogo,
  DAI: DAILogo,
}

const mainnetTokens = {
  [mainnet.id]: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  [optimism.id]: {
    USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  },
  [arbitrum.id]: {
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  },
}

// Testnet tokens go here
const devTokens = {
  [hardhat.id]: mainnetTokens[mainnet.id],
}

const tokens = { ...mainnetTokens, ...(process.env.NODE_ENV !== 'production' ? devTokens : {}) } as const

export default tokens
