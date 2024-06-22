import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {loading ? (
          <svg
            className="animate-spin-slow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M7.99967 1.8877C8.36787 1.8877 8.66633 2.18618 8.66633 2.55436V4.55436C8.66633 4.92255 8.36787 5.22103 7.99967 5.22103C7.63147 5.22103 7.333 4.92255 7.333 4.55436V2.55436C7.333 2.18618 7.63147 1.8877 7.99967 1.8877ZM7.99967 11.8877C8.36787 11.8877 8.66633 12.1862 8.66633 12.5544V14.5544C8.66633 14.9226 8.36787 15.221 7.99967 15.221C7.63147 15.221 7.333 14.9226 7.333 14.5544V12.5544C7.333 12.1862 7.63147 11.8877 7.99967 11.8877ZM13.7731 5.22103C13.9573 5.53989 13.848 5.94762 13.5291 6.13171L11.7971 7.13171C11.4782 7.31583 11.0705 7.20655 10.8864 6.88769C10.7023 6.56884 10.8115 6.16111 11.1304 5.97702L12.8625 4.97701C13.1813 4.79292 13.5891 4.90217 13.7731 5.22103ZM5.1129 10.221C5.29699 10.5399 5.18774 10.9476 4.86888 11.1317L3.13683 12.1317C2.81797 12.3158 2.41024 12.2066 2.22615 11.8877C2.04205 11.5688 2.1513 11.1611 2.47017 10.977L4.20221 9.97703C4.52107 9.79289 4.9288 9.90216 5.1129 10.221ZM13.7731 11.8877C13.5891 12.2066 13.1813 12.3158 12.8625 12.1317L11.1304 11.1317C10.8115 10.9476 10.7023 10.5399 10.8864 10.221C11.0705 9.90216 11.4782 9.79289 11.7971 9.97703L13.5291 10.977C13.848 11.1611 13.9573 11.5688 13.7731 11.8877ZM5.1129 6.88769C4.9288 7.20655 4.52107 7.31583 4.20221 7.13171L2.47017 6.13171C2.1513 5.94762 2.04205 5.53989 2.22615 5.22103C2.41024 4.90217 2.81797 4.79292 3.13683 4.97701L4.86888 5.97702C5.18774 6.16111 5.29699 6.56884 5.1129 6.88769Z"
              fill="white"
            />
          </svg>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
