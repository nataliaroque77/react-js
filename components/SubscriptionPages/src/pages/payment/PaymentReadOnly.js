import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { NextLink } from '@colorseven/link';
import Button from '@colorseven/button';
import Title from '@colorseven/title';
import Text from '@colorseven/text';

const PaymentReadOnly = ({ payment, onSave }) => {
    const t = useTranslations('SubscriptionPages.Payment');
    const testidBase = 'subscription-payment-read-only';

    const paymentExists = Object.keys(payment).length !== 0;
    const { last4 } = payment;
    const [userSelection, setUserSelection] = useState(null);

    useEffect(() => {
        let mealKitSubscription = localStorage.getItem('mealKitSubscription');
        mealKitSubscription = mealKitSubscription ? JSON.parse(mealKitSubscription) : {};
        setUserSelection({
            plan: mealKitSubscription?.selectedMealPlan,
            deliveryDay: mealKitSubscription?.deliveryDay?.label,
        });
    }, []);

    const onContinue = () => {
        onSave(payment, userSelection);
    };

    return (
        <div className="flex-1 w-full md:w-9/12">
            {paymentExists && (
                <>
                    <Title
                        className="text-xl font-bold leading-normal tracking-tight mb-5"
                        size={2}
                    >
                        {t('Title.howYouLikeToPay')}
                    </Title>

                    <div className="w-full flex justify-between mb-3">
                        <Title
                            className="text-lg font-medium leading-normal tracking-tight"
                            size={2}
                        >
                            {t('currentCreditCard')}
                        </Title>
                        <NextLink
                            className="text-teal underline ml-5 md:ml-10"
                            href="/subscriptions/payment/edit"
                        >
                            <span>{t('Title.change')}</span>
                        </NextLink>
                    </div>

                    <Text className="text-lg font-bold tracking-wide space-y-1 mb-5">
                        **** **** **** {last4}
                    </Text>

                    <Button
                        className="w-full my-2"
                        data-testid={`${testidBase}-cta`}
                        type="button"
                        onClick={onContinue}
                    >
                        {t('continue')}
                    </Button>
                </>
            )}
        </div>
    );
};

PaymentReadOnly.propTypes = {
    payment: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

export default PaymentReadOnly;
