import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import { PlanForm } from '@colorseven/meal-preferences';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';

const PlanEdit = ({
    plans,
    userPlan,
    deliveryDay,
    availableDeliveryDays,
    onCancelRedirect,
    onSaveUserPlan,
}) => {
    const t = useTranslations('ProfilePage.Subscriptions.Mealkit');

    return (
        <ProfileSubSection>
            <Heading>{t('heading')}</Heading>
            <PlanForm
                availableDeliveryDays={availableDeliveryDays}
                deliveryDay={deliveryDay}
                plans={plans}
                userPlan={userPlan}
                onCancel={onCancelRedirect}
                onSave={onSaveUserPlan}
            />
        </ProfileSubSection>
    );
};

PlanEdit.propTypes = {
    plans: PropTypes.object,
    userPlan: PropTypes.object,
    deliveryDay: PropTypes.string,
    availableDeliveryDays: PropTypes.arrayOf(PropTypes.string),
    onCancelRedirect: PropTypes.func.isRequired,
    onSaveUserPlan: PropTypes.func.isRequired,
};

export default PlanEdit;
