import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormProvider } from 'react-hook-form';
import { useTranslations } from 'use-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SCHEMA_PAYMENT } from '@colorseven/validations/src/FormSchemaValidation';
import { STRIPE_PAYMENT_ACTION } from '@colorseven/stripe';

import Text from '@colorseven/text';
import Alert from '@colorseven/alert';
import { AddressForm } from '@colorseven/address-form';
import ProfileButtonGroup from '@colorseven/profile-button-group';
import StripePaymentForm from '@colorseven/stripe-payment-form';

const TEST_ID_BASE = 'payment-edit';
const { NONE, CREATE, COMPLETED } = STRIPE_PAYMENT_ACTION;

const PaymentEdit = ({ isGoogleAPILoaded, locale, payment, hasServerError, onSave, onCancel }) => {
    const t = useTranslations('ProfilePage.Payment');

    const [formValues, setFormValues] = useState(payment);
    const [stripeAction, setStripeAction] = useState(NONE);
    const [showStripeError, setShowStripeError] = useState(false);

    const methods = useForm({
        resolver: yupResolver(SCHEMA_PAYMENT),
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;

    const { billing_address = {} } = payment;

    // matching fields of address component and backend response
    const defaultValues = {
        address: {
            addressLine1: billing_address.address_line1,
            addressLine2: billing_address.address_line2,
            city: billing_address.address_city,
            provinceCode: billing_address.address_state,
            country: billing_address.address_country,
            postalCode: billing_address.address_zip,
        },
    };

    // eslint-disable-next-line no-unused-vars
    const handleStripeResult = (action, { message, data }) => {
        setStripeAction(action);
        if (action === COMPLETED && data?.id) {
            onSave(data.id);
            showStripeError && setShowStripeError(false);
        }
    };

    const onSubmit = ({ address, nameOnCard }) => {
        const { addressLine1, addressLine2, city, provinceCode, postalCode, countryCode } = address;

        if (Object.keys(errors).length === 0) {
            setFormValues({
                ...formValues,
                name: nameOnCard,
                billing_address: {
                    address_line1: addressLine1,
                    address_line2: addressLine2,
                    address_city: city,
                    address_state: provinceCode,
                    address_country: countryCode,
                    address_zip: postalCode,
                },
            });
            setStripeAction(CREATE);
            !showStripeError && setShowStripeError(true);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                className="w-64 md:w-72 mt-8 mb-11"
                data-testid={TEST_ID_BASE}
                onSubmit={handleSubmit(onSubmit, () => {
                    /** Triggers Stripe form validation in order to show address and payment form errors at the same time */
                    if (!showStripeError) {
                        setShowStripeError(true);
                        setStripeAction(CREATE);
                    }
                })}
            >
                <StripePaymentForm
                    handleStripeResult={handleStripeResult}
                    locale={locale}
                    payment={{ ...payment, ...formValues }}
                    showStripeError={showStripeError}
                    stripeAction={stripeAction}
                />
                <Text className="font-bold text-sm">{t('billingAddress')}</Text>
                <AddressForm
                    address={defaultValues.address}
                    isGoogleAPILoaded={isGoogleAPILoaded}
                    shouldShowComplementaryFields={false}
                />
                <div className="mb-9" />
                {hasServerError && (
                    <div className="-mt-3 mb-5">
                        <Alert>{t('serverError')}</Alert>
                    </div>
                )}

                <ProfileButtonGroup onCancel={onCancel} />
            </form>
        </FormProvider>
    );
};

PaymentEdit.propTypes = {
    isGoogleAPILoaded: PropTypes.bool,
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    payment: PropTypes.object,
    hasServerError: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default PaymentEdit;
