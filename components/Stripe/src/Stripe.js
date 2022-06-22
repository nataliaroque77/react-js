import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Stripe = ({ publishableKey, children, locale = 'en-CA', ...restOptions }) => {
    const stripeLocale = locale === 'en-CA' ? 'en' : locale;

    const stripePromise = useMemo(() => loadStripe(publishableKey), [publishableKey]);

    return (
        <Elements
            options={{
                // This object is used to pass custom fonts via a stylesheet URL when creating an Elements object.
                // custom fonts can only be tested via HTTPS
                fonts: [
                    {
                        style: 'normal',
                        family: 'Poppins',
                        cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
                    },
                ],
                locale: stripeLocale,
                ...restOptions,
            }}
            stripe={stripePromise}
        >
            {children}
        </Elements>
    );
};

export default Stripe;

Stripe.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    publishableKey: PropTypes.string,
};
