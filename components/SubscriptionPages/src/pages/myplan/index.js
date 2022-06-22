import PropTypes from 'prop-types';
import { MealPlanSelector } from '@colorseven/meal-plan-selector';
import SubscriptionHeroBanner from '../../SubscriptionHeroBanner';
import SubscriptionCarousel from '../../SubscriptionCarousel';

const SubscriptionMyPlan = ({ plans = {}, recipes = {}, onSave }) => {
    const plansExists = Object.keys(plans).length !== 0;
    const handleOnSave = (selectedPlan) => {
        const mealKitSubscription = {
            selectedMealPlan: selectedPlan,
            deliveryDay: null,
        };
        try {
            localStorage.setItem('mealKitSubscription', JSON.stringify(mealKitSubscription));
        } catch (err) {
            //throw new Error('selected meal plan has not been set');
        }
        onSave(mealKitSubscription);
    };

    return (
        plansExists && (
            <div>
                <SubscriptionHeroBanner />
                <section className="relative md:-top-20  w-full md:w-11/12 lg:w-10/12 m-auto">
                    {plans && <MealPlanSelector plans={plans} onSave={handleOnSave} />}
                </section>
                <section>
                    <SubscriptionCarousel recipes={recipes} />
                </section>
            </div>
        )
    );
};

SubscriptionMyPlan.propTypes = {
    plans: PropTypes.object,
    recipes: PropTypes.object,
    onSave: PropTypes.func.isRequired,
};

export default SubscriptionMyPlan;
