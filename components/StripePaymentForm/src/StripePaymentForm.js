import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { useFormContext } from 'react-hook-form';

import { Input } from '@colorseven/input';
import { Stripe, PaymentForm, STRIPE_PAYMENT_ACTION } from '@colorseven/stripe';

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const StripePaymentForm = ({
    payment,
    locale,
    stripeAction,
    handleStripeResult,
    showStripeError,
}) => {
    const t = useTranslations('StripePaymentForm');

    const methods = useFormContext();

    const getError = (key) => methods?.formState.errors[key] && methods?.formState.errors[key].type;

    return (
        <>
            <Input
                className="my-4"
                label={t('nameOnCard')}
                name="nameOnCard"
                placeholder={t('nameOnCard')}
                type="text"
                {...methods.register('nameOnCard')}
                defaultValue={payment.name || ''}
                error={getError('nameOnCard')}
            />
            {STRIPE_PUBLISHABLE_KEY && (
                <Stripe locale={locale} publishableKey={STRIPE_PUBLISHABLE_KEY}>
                    <PaymentForm
                        action={stripeAction}
                        billingAddress={payment.billing_address}
                        handleStripeResult={handleStripeResult}
                        name={payment.name}
                        showStripeError={showStripeError}
                        trn={{
                            creditCardNum: t('creditCardNum'),
                            expiration: t('expiration'),
                            CVV: t('CVV'),
                            CVVVisaMasterTitle: t('CVVVisaMasterTitle'),
                            CVVAMexTitle: t('CVVAMexTitle'),
                            CVVTooltipVisaMaster: t('CVVTooltipVisaMaster'),
                            CVVTooltipAMex: t('CVVTooltipAMex'),
                        }}
                    />
                </Stripe>
            )}
        </>
    );
};

StripePaymentForm.propTypes = {
    payment: PropTypes.shape({
        name: PropTypes.string,
        billing_address: PropTypes.object,
    }),
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    stripeAction: PropTypes.oneOf(Object.values(STRIPE_PAYMENT_ACTION)),
    handleStripeResult: PropTypes.func,
    showStripeError: PropTypes.bool,
};

export default StripePaymentForm;
