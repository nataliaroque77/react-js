import clsx from 'clsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import {
    useStripe,
    useElements,
    CardCvcElement,
    CardNumberElement,
    CardExpiryElement,
} from '@stripe/react-stripe-js';

import Text from '@colorseven/text';
import { Cvv } from '@colorseven/tooltip';
import { InfoCircle } from '@colorseven/icons';

import { STRIPE_PAYMENT_ACTION } from './fixtures';
import StripeElementWrapper from './StripeElementWrapper';

const { NONE, CREATE, COMPLETED, INCOMPLETED, ERROR } = STRIPE_PAYMENT_ACTION;

export const PaymentForm = ({
    trn,
    name,
    billingAddress,
    handleStripeResult,
    action = NONE,
    showStripeError,
}) => {
    const t = useTranslations('Stripe');
    const stripe = useStripe();
    const elements = useElements();

    const [cvv, setCvv] = useState(defaultState);
    const [exp, setExp] = useState(defaultState);
    const [cardNum, setCardNum] = useState(defaultState);
    const [isCVVToolTipOpened, setIsCVVToolTipOpened] = useState(false);

    const createStripeCardToken = async () => {
        try {
            const { error, token } = await triggerStripe();
            if (!error) {
                handleStripeResult(COMPLETED, { message: '', data: token });
            } else handleStripeResult(ERROR, { message: error.message });
        } catch (err) {
            handleStripeResult(ERROR, { message: err?.message });
        }
    };

    const triggerStripe = async () => {
        if (stripe && elements) {
            const { address_city, address_line1, address_line2, address_zip, address_state } =
                billingAddress;
            const { error, token } = await stripe.createToken(
                elements.getElement(CardNumberElement),
                {
                    name,
                    address_line1,
                    address_line2,
                    address_city,
                    address_state,
                    address_zip,
                },
            );
            return { error, token };
        }
        return { error: { message: 'stripe || elements is empty' }, token: '' };
    };

    const checkErr = (errMsg, isComplete) => (!!errMsg || !isComplete) && action !== NONE;

    const errorExists = () =>
        checkErr(cardNum.errMsg, cardNum.isComplete) ||
        checkErr(exp.errMsg, exp.isComplete) ||
        checkErr(cvv.errMsg, cvv.isComplete);

    useEffect(() => {
        if (action === NONE) return;
        if (!errorExists() && action === CREATE) {
            createStripeCardToken();
        } else handleStripeResult(INCOMPLETED, { message: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);

    const getErrorMsg = (type, hasValue) =>
        hasValue ? t(`errors.${type}.incomplete`) : t(`errors.${type}.required`);

    const getStripeError = () => {
        if (checkErr(cardNum.errMsg, cardNum.isComplete))
            // ** Removes the dot from Stripe error message */
            return cardNum?.errMsg.slice(0, -1) || getErrorMsg('cardNum', cardNum.hasValue);
        if (checkErr(exp.errMsg, exp.isComplete))
            return exp?.errMsg?.slice(0, -1) || getErrorMsg('exp', exp.hasValue);
        if (checkErr(cvv.errMsg, cvv.isComplete))
            return cvv?.errMsg?.slice(0, -1) || getErrorMsg('cvv', cvv.hasValue);
        return '';
    };

    return !stripe || !elements ? (
        <div />
    ) : (
        <>
            <div className="my-4">
                <StripeElementWrapper
                    error={checkErr(cardNum.errMsg, cardNum.isComplete)}
                    hasValue={cardNum.hasValue}
                    isFocused={cardNum.isFocused}
                    label={trn['creditCardNum']}
                    name="creditCardNum"
                    placeholder={trn['creditCardNum']}
                    stripeElement={<CardNumberElement {...getDefaultProps(cardNum, setCardNum)} />}
                />
            </div>
            <div className="flex flex-row my-4">
                <div className="flex-1 mr-4">
                    <StripeElementWrapper
                        error={checkErr(exp.errMsg, exp.isComplete)}
                        hasValue={exp.hasValue}
                        isFocused={exp.isFocused}
                        label={trn['expiration']}
                        name="expiration"
                        placeholder={trn['expiration']}
                        stripeElement={<CardExpiryElement {...getDefaultProps(exp, setExp)} />}
                    />
                </div>
                <div className="flex-1 items-center">
                    <StripeElementWrapper
                        error={checkErr(cvv.errMsg, cvv.isComplete)}
                        hasValue={cvv.hasValue}
                        inlineElement={
                            <Cvv
                                AMexDesc={trn['CVVTooltipAMex']}
                                AMexTitle={trn['CVVAMexTitle']}
                                opened={isCVVToolTipOpened}
                                target={
                                    <div
                                        onBlur={() => setIsCVVToolTipOpened(false)}
                                        onFocus={() => setIsCVVToolTipOpened(true)}
                                        onMouseEnter={() => setIsCVVToolTipOpened(true)}
                                        onMouseLeave={() => setIsCVVToolTipOpened(false)}
                                        onMouseOver={() => setIsCVVToolTipOpened(true)}
                                    >
                                        <InfoCircle />
                                    </div>
                                }
                                visaMasterDesc={trn['CVVTooltipVisaMaster']}
                                visaMasterTitle={trn['CVVVisaMasterTitle']}
                                onClose={() => setIsCVVToolTipOpened(false)}
                            />
                        }
                        isFocused={cvv.isFocused}
                        label={trn['CVV']}
                        name="CVV"
                        placeholder={trn['CVV']}
                        stripeElement={<CardCvcElement {...getDefaultProps(cvv, setCvv)} />}
                    />
                </div>
            </div>
            {showStripeError && (
                <Text className={clsx('text-sm text-red mb-6', { hidden: !getStripeError() })}>
                    {getStripeError()}
                </Text>
            )}
        </>
    );
};

const defaultState = {
    errMsg: '',
    isFocused: false,
    isComplete: false,
    hasValue: false,
};

const getDefaultProps = (preState, setValue) => ({
    className:
        'absolute w-full h-20 pt-7 z-10 top-0 bottom-0 font-bold appearance-none text-base md:text-sm text-black outline-none flex-grow transition-opacity ease-in-out',
    options: {
        placeholder: '',
        style: {
            base: {
                // stripe needs px instead of rem
                fontSize: '13px',
                fontFamily: 'Poppins',
            },
            invalid: {
                color: 'black',
            },
        },
    },
    onBlur: () => setValue({ ...preState, isFocused: false }),
    onChange: (e) => {
        setValue({
            ...preState,
            hasValue: !e.empty,
            errMsg: e.error?.message || '',
            isComplete: e.complete,
        });
    },
    onFocus: () => setValue({ ...preState, isFocused: true }),
});

PaymentForm.propTypes = {
    trn: PropTypes.object,
    userId: PropTypes.string,
    name: PropTypes.string,
    billingAddress: PropTypes.object,
    handleStripeResult: PropTypes.func,
    action: PropTypes.oneOf(Object.values(STRIPE_PAYMENT_ACTION)),
    showStripeError: PropTypes.bool,
};

export default PaymentForm;
