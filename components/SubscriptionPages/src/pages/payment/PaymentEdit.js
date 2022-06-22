import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslations } from 'use-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@colorseven/checkbox';
import { AddressForm } from '@colorseven/address-form';
import Title from '@colorseven/title';

import { SCHEMA_PAYMENT } from '@colorseven/validations/src/FormSchemaValidation';
import { STRIPE_PAYMENT_ACTION } from '@colorseven/stripe';

import StripePaymentForm from '@colorseven/stripe-payment-form';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';
import UserAddressReadOnly from './UserAddressReadOnly';
import SecuredPaymentGroup from '../../SecuredPaymentGroup';

import Text from '@colorseven/text';
import FormButtonGroup from '../../FormButtonGroup';
import SkipPlan from '../../SkipPlan';

const { NONE, CREATE, COMPLETED } = STRIPE_PAYMENT_ACTION;

// eslint-disable-next-line complexity
const SubscriptionPaymentEdit = ({
    locale,
    payment,
    address,
    isGoogleAPILoaded,
    paymentError,
    onSave,
    onCancel,
}) => {
    const t = useTranslations('SubscriptionPages.Payment');
    const testidBase = 'subscription-payment';

    const { billing_address = {}, last4 } = payment;

    const isMounted = useRef(false);

    const [formValues, setFormValues] = useState(payment);
    const [stripeAction, setStripeAction] = useState(NONE);
    const [sameAddress, setSameAddress] = useState(false);
    const [defaultAddress, setAddressDefault] = useState({});
    const [showStripeError, setShowStripeError] = useState(false);

    const methods = useForm({
        resolver: yupResolver(SCHEMA_PAYMENT),
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (Object.keys(billing_address).length !== 0) {
            setAddressDefault({
                address: {
                    addressLine1: billing_address.address_line1,
                    addressLine2: billing_address.address_line2,
                    city: billing_address.address_city,
                    provinceCode: billing_address.address_state,
                    country: billing_address.address_country,
                    postalCode: billing_address.address_zip,
                },
            });
        }
    }, [billing_address]);

    // eslint-disable-next-line no-unused-vars
    const handleStripeResult = (action, { message, data }) => {
        setStripeAction(action);
        if (action === COMPLETED && data?.id) {
            console.log('im in COMPLETED');
            onSave(data.id);
        }
    };

    const onSubmit = (data) => {
        let billingAddress;
        if (!sameAddress) {
            // if billing_address is not same than delivery address: set new billing address from form-data
            const { addressLine1, addressLine2, city, provinceCode, postalCode, countryCode } =
                data.address;

            billingAddress = {
                address_line1: addressLine1,
                address_line2: addressLine2,
                address_city: city,
                address_state: provinceCode,
                address_country: countryCode,
                address_zip: postalCode,
            };
        } else {
            // if billing_address is same than delivery address: set "billing address" with "delivery address" values
            billingAddress = {
                address_line1: address.address_line_1,
                address_line2: address.address_line_2,
                address_city: address.city,
                address_state: address.postal_code,
                address_country: address.country_code,
                address_zip: address.province_code,
            };
        }
        if (Object.keys(errors).length === 0) {
            setFormValues({
                ...formValues,
                nameOnCard: data.nameOnCard,
                billing_address: billingAddress,
            });
            setStripeAction(CREATE);
            !showStripeError && setShowStripeError(true);
        }
    };

    const onChangeBillingAddress = () => {
        setSameAddress(!sameAddress);
    };

    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between px-4 sm:px-0">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-5">
                <Title className="text-xl font-bold leading-normal tracking-tight mb-5" size={1}>
                    {t('Title.changeYourPaymentMethod')}
                </Title>
                <Title className="text-lg font-medium leading-normal tracking-tight" size={2}>
                    {t('currentCreditCard')}
                </Title>
                <Text className="text-lg font-bold tracking-wide space-y-1 mb-5">
                    **** **** **** {last4}
                </Text>

                {isMounted.current && <SecuredPaymentGroup />}

                <FormProvider {...methods}>
                    <form
                        // avoid default submit behaviour, as stripe form needed to be checked
                        data-testid={testidBase}
                        onSubmit={handleSubmit(onSubmit, () => {
                            if (!showStripeError) {
                                setStripeAction(CREATE);
                                setShowStripeError(true);
                            }
                        })}
                    >
                        <fieldset>
                            <legend className="sr-only"> {t('Title.creditCardDetails')}</legend>
                            <StripePaymentForm
                                handleStripeResult={handleStripeResult}
                                locale={locale}
                                payment={payment}
                                stripeAction={stripeAction}
                            />
                        </fieldset>

                        <fieldset>
                            <legend className="text-xl font-bold leading-normal tracking-tight mb-5 mt-5">
                                {t('billingAddress')}
                            </legend>
                            <div className="mb-5">
                                <Checkbox onChange={onChangeBillingAddress}>
                                    {t('Title.useMyDeliveryAddress')}
                                </Checkbox>
                            </div>
                            {isMounted.current && !sameAddress && (
                                <AddressForm
                                    address={defaultAddress.address}
                                    isGoogleAPILoaded={isGoogleAPILoaded}
                                    shouldShowComplementaryFields={true}
                                />
                            )}
                        </fieldset>

                        {/* TODO: Wait for proper error handling and designs for form errors */}
                        {paymentError && (
                            <Text className="text-sm text-red mb-6">{t('paymentError')}</Text>
                        )}

                        <FormButtonGroup onCancel={onCancel} />
                    </form>
                </FormProvider>
            </div>
            <div className="w-full md:w-6/12 lg:w-5/12">
                <SubscriptionPlanSummary />
                <UserAddressReadOnly address={address} />
                <SkipPlan />
            </div>
        </div>
    );
};

SubscriptionPaymentEdit.propTypes = {
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    address: PropTypes.shape({
        id: PropTypes.string,
        user_id: PropTypes.string,
        address_line_1: PropTypes.string,
        address_line_2: PropTypes.string,
        building_type: PropTypes.string,
        company: PropTypes.string,
        city: PropTypes.string,
        province_code: PropTypes.string,
        country_code: PropTypes.string,
        postal_code: PropTypes.string,
        special_instructions: PropTypes.string,
        is_default: PropTypes.bool,
        fsa: PropTypes.string,
    }),
    payment: PropTypes.object,
    paymentError: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    isGoogleAPILoaded: PropTypes.bool.isRequired,
};

export default SubscriptionPaymentEdit;
