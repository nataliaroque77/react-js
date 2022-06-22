import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslations, useIntl } from 'use-intl';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';
import Title from '@colorseven/title';
import Text from '@colorseven/text';
import Button from '@colorseven/button';
import { Schedule } from '@colorseven/icons';

const SubscriptionBonAppetit = ({ redirectToMealKitCategory }) => {
    const t = useTranslations('SubscriptionPages.BonAppetit');
    const testidBase = 'subscription-bon-appetit-page';
    const { formatDateTime } = useIntl();

    const [selectedMealPlan, setSelectedMealPlan] = useState(null);
    const [deliveryDay, setDeliveryDay] = useState(null);

    useEffect(() => {
        let mealKitSubscription = localStorage.getItem('mealKitSubscription');
        mealKitSubscription = mealKitSubscription ? JSON.parse(mealKitSubscription) : {};
        setSelectedMealPlan(mealKitSubscription.selectedMealPlan);
        setDeliveryDay(new Date(mealKitSubscription?.deliveryDay?.value));
    }, []);

    const onClick = () => {
        if (selectedMealPlan) {
            redirectToMealKitCategory(selectedMealPlan.planType);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row flex-col-reverse justify-between my-20 px-4 sm:px-0">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-7 mt-10 sm:mt-0">
                <SubscriptionPlanSummary isPlanDetailsShown={false} />
                <div className="flex bg-gray-100 mt-4 rounded-md p-2">
                    <Schedule className="inline-block w-6" />
                    <Text className="font-normal text-md ml-1">{t('skipPlan')}</Text>
                </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-7/12">
                <Title className="font-bold text-6xl leading-tight" size={1}>
                    {t('heading')}
                </Title>
                <Text className="text-xl mt-5">
                    {t('description')}
                    <span className="uppercase font-bold">
                        {formatDateTime(deliveryDay, {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                </Text>
                <Button
                    className="flex-1 w-full md:w-10/12 lg:w-5/12 mt-10 mb-4"
                    data-testid={`${testidBase}-cta`}
                    type="button"
                    onClick={onClick}
                >
                    {t('chooseYourRecipes')}
                </Button>
            </div>
        </div>
    );
};

SubscriptionBonAppetit.propTypes = {
    redirectToMealKitCategory: PropTypes.func,
};

export default SubscriptionBonAppetit;
