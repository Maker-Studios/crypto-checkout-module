import { tokenIcons } from '@/lib/tokens'
import { useReadContracts } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { TokenData } from '@/lib/types'

// TODO : Use regular image when token is not stable

const Token = ({
  address,
  name,
  owner,
  amount,
  chainId,
  selected,
  onSelect,
}: {
  address: `0x${string}`
  owner: `0x${string}`
  amount: number
  chainId: number
  selected: boolean
  onSelect: (data: TokenData) => void
  name?: string
}) => {
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'name',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [owner],
      },
    ],
  })

  if (!data) {
    return null
  }

  const [decimal, tokenName, symbol, balance] = data
  const formattedBalance = Number(formatUnits(balance, decimal))
  const hasEnoughBalance = formattedBalance >= amount

  const TokenIcon = name && tokenIcons.hasOwnProperty(name) ? tokenIcons[name as keyof typeof tokenIcons] : () => null

  return (
    <label
      className={cn(
        'flex flex-1 justify-between items-center border border-[#F0F0F0] bg-white rounded-[12px] p-[8.4px]',
        { 'opacity-50': !hasEnoughBalance }
      )}
    >
      <div className="flex flex-row space-x-2">
        <input
          type="radio"
          value={address}
          onChange={() => onSelect({ address, decimal, symbol, balance: formattedBalance, name: tokenName, chainId })}
          checked={selected}
          className="hidden"
          disabled={!hasEnoughBalance}
        />
        <div>
          {/* {name && tokenIcons.hasOwnProperty(name) ? tokenIcons[name as keyof typeof tokenIcons]() : ""} */}
          <TokenIcon className="w-[34.5px] h-[34.5px]" />
        </div>
        <div className="flex flex-col font-geist">
          <span className="text-[13px] font-medium text-[#6F6F6F]">{tokenName}</span>
          <span className="text-[10px] font-medium text-[#A9A9A9]">
            {formattedBalance} {symbol}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <mask
              id="mask0_1286_3019"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="17"
              height="17"
            >
              <rect x="0.0996094" y="0.95459" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1286_3019)">
              <path
                d="M7.16595 12.0214L11.866 7.32142L10.9326 6.38809L7.16595 10.1548L5.26595 8.25475L4.33262 9.18809L7.16595 12.0214ZM8.09928 15.6214C7.17706 15.6214 6.31039 15.4464 5.49928 15.0964C4.68817 14.7464 3.98262 14.2714 3.38262 13.6714C2.78262 13.0714 2.30762 12.3659 1.95762 11.5548C1.60762 10.7436 1.43262 9.87697 1.43262 8.95475C1.43262 8.03253 1.60762 7.16586 1.95762 6.35475C2.30762 5.54364 2.78262 4.83809 3.38262 4.23809C3.98262 3.63809 4.68817 3.16309 5.49928 2.81309C6.31039 2.46309 7.17706 2.28809 8.09928 2.28809C9.02151 2.28809 9.88817 2.46309 10.6993 2.81309C11.5104 3.16309 12.216 3.63809 12.816 4.23809C13.416 4.83809 13.8909 5.54364 14.2409 6.35475C14.5909 7.16586 14.7659 8.03253 14.7659 8.95475C14.7659 9.87697 14.5909 10.7436 14.2409 11.5548C13.8909 12.3659 13.416 13.0714 12.816 13.6714C12.216 14.2714 11.5104 14.7464 10.6993 15.0964C9.88817 15.4464 9.02151 15.6214 8.09928 15.6214Z"
                fill="#00BD57"
              />
            </g>
          </svg>
        ) : (
          <motion.svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <mask
              id="mask0_1286_2803"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="17"
              height="17"
            >
              <rect x="0.0996094" y="0.754395" width="16" height="16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1286_2803)">
              <path
                d="M8.10026 15.4212C7.17804 15.4212 6.31137 15.2462 5.50026 14.8962C4.68915 14.5462 3.98359 14.0712 3.38359 13.4712C2.78359 12.8712 2.30859 12.1657 1.95859 11.3546C1.60859 10.5434 1.43359 9.67678 1.43359 8.75456C1.43359 7.83233 1.60859 6.96567 1.95859 6.15456C2.30859 5.34345 2.78359 4.63789 3.38359 4.03789C3.98359 3.43789 4.68915 2.96289 5.50026 2.61289C6.31137 2.26289 7.17804 2.08789 8.10026 2.08789C9.02248 2.08789 9.88915 2.26289 10.7003 2.61289C11.5114 2.96289 12.2169 3.43789 12.8169 4.03789C13.4169 4.63789 13.8919 5.34345 14.2419 6.15456C14.5919 6.96567 14.7669 7.83233 14.7669 8.75456C14.7669 9.67678 14.5919 10.5434 14.2419 11.3546C13.8919 12.1657 13.4169 12.8712 12.8169 13.4712C12.2169 14.0712 11.5114 14.5462 10.7003 14.8962C9.88915 15.2462 9.02248 15.4212 8.10026 15.4212ZM8.10026 14.0879C9.58915 14.0879 10.8503 13.5712 11.8836 12.5379C12.9169 11.5046 13.4336 10.2434 13.4336 8.75456C13.4336 7.26567 12.9169 6.00456 11.8836 4.97122C10.8503 3.93789 9.58915 3.42122 8.10026 3.42122C6.61137 3.42122 5.35026 3.93789 4.31693 4.97122C3.28359 6.00456 2.76693 7.26567 2.76693 8.75456C2.76693 10.2434 3.28359 11.5046 4.31693 12.5379C5.35026 13.5712 6.61137 14.0879 8.10026 14.0879Z"
                fill="#868686"
              />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>
    </label>
  )
}

export default Token
