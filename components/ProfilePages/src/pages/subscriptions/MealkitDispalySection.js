import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';
import ProfileInfoDisplayTextPair from '../../ProfileInfoDisplayTextPair';

const MealkitDisplaySection = ({ userPlan }) => {
    const t = useTranslations('ProfilePage.Subscriptions.Mealkit');

    const { deliveryDay = '', userPlanDetail = {} } = userPlan;
    const { planType, number_of_recipes, number_of_portions, pricing } = userPlanDetail;
    const totalPerWeek = pricing?.total;
    const servingPrice =
        Math.round(
            (totalPerWeek / (number_of_portions * number_of_recipes) + Number.EPSILON) * 100,
        ) / 100;

    return (
        <ProfileSubSection>
            <Heading href="/profile/subscriptions/plan" isAdd={false} isEdit={true}>
                {t('heading')}
            </Heading>
            <div className="pt-5 pb-10">
                <ProfileInfoDisplayTextPair
                    fieldName={t('Title.deliveryDay')}
                    value={t(`weekday.${deliveryDay}`)}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Title.plan')}
                    value={t(`Plans.${planType}`)}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Title.recipeWeek')}
                    value={`${number_of_recipes} ${t('recipe', {
                        numOfRecipes: number_of_recipes,
                    })}`}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Title.servings')}
                    value={`${number_of_portions} ${t('serving', {
                        numOfServings: number_of_portions,
                    })}`}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Title.totalPerWeek')}
                    value={t('totalPerWeek', {
                        totalPerWeek,
                        servingPrice,
                    })}
                />
                <Text className="text-sm">
                    {/* will handle onclick in unsubscribe modale story */}
                    <button className="text-teal underline" onClick={() => {}}>
                        {t('unsubscribe')}
                    </button>
                </Text>
            </div>
        </ProfileSubSection>
    );
};

MealkitDisplaySection.propTypes = {
    userPlan: PropTypes.object,
};

export default MealkitDisplaySection;
