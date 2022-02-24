import React from 'react'
import StripeCheckout  from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    const publishableKey= 'pk_test_51KWCzfBEY1cxzpWQSvAymSrzsR6ZeGkfj5DX5Zy7DBB4yjcACheQNjECDsjH4UKxDt4ZKT1jpahJQDi2vqWtZKPU00yQPNr0Dk'
    
    const onToken = token => {
        console.log(token)
        alert('Payment Succesful')
    }
    return (
        <StripeCheckoutButton
          label = 'Pay now'
          name='CRWN Clothing Ltd.'
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is {price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        >

        </StripeCheckoutButton>
    )

}

export default StripeCheckout