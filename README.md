# 3dayMVP - Crypto Checkout Module

![Crypto checkout module og image](https://github.com/Maker-Studios/crypto-checkout-module/blob/main/public/header.png?raw=true)

## Shoutouts :tada:

This module takes advantage of some great open source software:

- [Next.js](https://nextjs.org/) - This app was built using Next.JS.
- [Viem.sh](https://viem.sh/) & [Wagmi.sh](https://wagmi.sh) - We use the react hooks and utils for wallet/contract interactions.
- [RainbowKit](https://rainbowkit.com) - For wallet connection.
- [TailwindCSS](https://tailwindcss.com/) - We use tailwind to style our components.
- [Shadcn UI](https://ui.shadcn.com/) - We use shadcn components as the base layer for our custom components.
- And many more awesome libraries, just checkout our package files to see what we are using.

## Get started

Setup the env, first make a copy of the sample env file:

```bash
cp .env.sample .env.local
```

Fill in the values:

```.env
NEXT_PUBLIC_WC="walletconnet Project ID"
NEXT_PUBLIC_VENDORADDRESS="Your ethereum address"
// you can change the checkout contract, but the prefield address is the same and available on ETH, OP & ARB mainnet
NEXT_PUBLIC_CHECKOUT="0xc455efc865323704161B08bd90eFf22181A3601C"
# RPCs
NEXT_PUBLIC_MAINNET=""
NEXT_PUBLIC_ARB=""
NEXT_PUBLIC_OP=""
```

Install all necessary packages:

```bash
yarn install
```

And start the frontend server:

```bash
yarn dev
```

The app should be available on `http://localhost:3000`

## Folder Structure

Folder structure for all relevant providers, components and hooks used across the app.

```
src/
  - app/(checkout)
    - layout.tsx [Wagmi & RainbowKit provider setup]
    - page.tsx [payout component is consumed here]
  - components
    - payout
      - Payout.tsx [entry point to the checkout module, where you can change surface level props]
      - steps/ (container for all checkout steps)
    - ui/ [where shadcn UI components live with a custom price view component]
    web3/ [Web3 related reusable components]
  - hooks
    - useChainStables.tsx [React hook for updating token address on chain switch]
  - lib
    - tokens.ts [list of available token (default USDC, USDT & DAI) on ETH, OP, ARB]
    - types.ts [custom types used across the app]
```

## Customizing Checkout w/ Props

Here's the exhaustive list of all the props you have available out the box:

```jsx

const App = () => {
  const [checkoutUID, setCheckoutUID] = useState<string>()

  return (
    <>
      <div className="min-h-screen grid place-items-center bg-[#ECECEC]">
        <Checkout
          title="Payment Modal Title"
          pricing={10} // price
          logo={<>React component of the Logo to show in Checkout</>}
          confirmations={1} // how many block confirmations before state change
          checkoutUID={"Custom ID to use related to user on contract interaction"}
          onPaymentMethodSubmit={async ({ type, email }: { type: 'stripe' | 'crypto'; email: string }) => {
            console.log(`DEBUG: ${email} chose ${type}`)
            // set uid after server-side processing with info
            // you can create and update the checkoutUID here
          }}
          onCompleted={() => {
            console.log(`Payment is completed`)
            // you can redirect after user clicks done at the end of checkout or send invoice etc
          }}
          vendor={process.env.NEXT_PUBLIC_VENDORADDRESS} // your 0x address for receiving payout
          checkoutContract={process.env.NEXT_PUBLIC_CHECKOUT} // checkout contract address
          pricingDescription={`Some description text about this plan.
          
          It can be multi-line and dynamic or even a react component`}  // custom string/ReactNode for price description
          successMessage={`A thank you message to the customer.
          
          Say something nice ;)`} // custom string/ReactNode to show on successful checkout completion
        />
      </div>
    </>
  )
}

```

## Deployments

You can find all deployments to the same address (`0xc455efc865323704161B08bd90eFf22181A3601C`) on ETH, OP & ARB. It currently has a fee of 1% per checkout call. See links below:

| Chains           | Deployment address                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Mainnet | [0xc455efc865323704161B08bd90eFf22181A3601C](https://etherscan.com/address/0xc455efc865323704161B08bd90eFf22181A3601C)           |
| Optimism Mainnet | [0xc455efc865323704161B08bd90eFf22181A3601C](https://optimistic.etherscan.io/address/0xc455efc865323704161b08bd90eff22181a3601c) |
| Arbitrum Mainnet | [0xc455efc865323704161B08bd90eFf22181A3601C](https://arbiscan.io/address/0xc455efc865323704161b08bd90eff22181a3601c#code)        |

## Credits

Got to work on this with my amazing pod:

- [Moscode](https://twitter.com/meandchimso) - UI & micro-interactions
- [Leye](https://twitter.com/leyeconnect) - UI/UX & Graphics design
- [Bliss](https://twitter.com/ghostffcode) - Web3/Smart contract, UI & product development.
