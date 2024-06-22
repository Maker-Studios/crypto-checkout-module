const USDollar = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

const Price = ({ price, shouldFormat = true }: { price: number, shouldFormat?: boolean }) => {
  return (<>
    {(shouldFormat ? USDollar : Intl.NumberFormat()).format(price)}
  </>)
}

export default Price