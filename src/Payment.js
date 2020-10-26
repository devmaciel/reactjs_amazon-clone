import React, { useState, useEffect } from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios'; //local file axios

function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    // Stripe
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
 
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret, which allows us to change a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencis subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]) //whenever the basket change, do this useEffect

    console.log('the secret is ->', clientSecret);

    const handleSubmit = async (event) => {
        //stripe magic
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => { //destruct from "(payment)"
            // paymentIntent = payment confrimation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any error as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    // End Stripe

    return (
        <div className="payment">
            <div className="payment__container">

                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                {/* Payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors, if have error, then show the error message*/}
                            {error && <div>{error}</div>} 
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
