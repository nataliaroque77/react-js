import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import PlanSummaryCard from '@colorseven/plan-summary-card';

const SubscriptionPlanSummary = ({ isPlanDetailsShown = true }) => {
    const t = useTranslations('SubscriptionPages.PlanSummary');

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [summary, setSummary] = useState(null);

    const summaryTitle = t('heading');
    const planSubtitle = t('description', {
        numOfRecipes: selectedPlan?.numOfRecipes,
        numOfPortions: selectedPlan?.numOfPortions,
    });

    useEffect(() => {
        let mealKitSubscription = localStorage.getItem('mealKitSubscription');
        mealKitSubscription = mealKitSubscription ? JSON.parse(mealKitSubscription) : {};
        if (mealKitSubscription.selectedMealPlan) {
            setSelectedPlan(mealKitSubscription.selectedMealPlan);
        }
    }, []);

    useEffect(() => {
        const pricePerServing =
            Math.round(
                (selectedPlan?.total / (selectedPlan?.numOfPortions * selectedPlan?.numOfRecipes) +
                    Number.EPSILON) *
                    100,
            ) / 100;

        if (selectedPlan) {
            setSummary({
                title: summaryTitle,
                id: selectedPlan?.planId,
                planTitle: selectedPlan?.planType,
                priceDiscount: pricePerServing,
                discountedPrice: selectedPlan?.pricing?.discounted_price,
                shippingDiscount: selectedPlan?.pricing?.shipping_discount,
                discountedShipping: selectedPlan?.pricing?.discounted_shipping,
                total: selectedPlan?.pricing?.total,
                image: {
                    altTitle: 'Classic Image',
                    id: 'image-id-1',
                    url: 'https://cdn.makeColorseven.ca/uploads/images/1bc616a0e172166e2d89beb1e2a596dd/steps/y87vgifgjBLBAKZ9jt6p4xjgvODieC3AMxwbFXw41623326954_s.jpg',
                },
                size: 'FULL',
                isPlanDetailsShown: isPlanDetailsShown,
            });
            //TODO: add Coupon once Plan Summary Card is updated
        }
    }, [selectedPlan, summaryTitle, isPlanDetailsShown]);

    return <div>{selectedPlan && <PlanSummaryCard {...{ ...summary, planSubtitle }} />}</div>;
};

SubscriptionPlanSummary.propTypes = {
    isPlanDetailsShown: PropTypes.bool,
};
export default SubscriptionPlanSummary;
