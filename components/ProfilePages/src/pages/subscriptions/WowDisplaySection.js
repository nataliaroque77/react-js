import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';
import { PropositionList } from '@colorseven/meal-preferences';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';
import ProfileInfoDisplayTextPair from '../../ProfileInfoDisplayTextPair';

const WowDisplaySection = ({ wow }) => {
    const t = useTranslations('ProfilePage.Subscriptions.Wow');
    return (
        <ProfileSubSection>
            <Heading href="/profile/subscriptions/wow" isAdd={false} isEdit={false}>
                {t('heading')}
            </Heading>
            <Text className="my-3.5 text-xs">{t('Title.valueProp')}</Text>
            <ProfileInfoDisplayTextPair
                fieldName={t('subscribedPlan')}
                value={`${wow.subscriptionCost} + ${t('tax')}`}
            />
            <PropositionList />
            <Text className="mt-5 mb-12 text-sm">
                {/* will handle onclick with unsubscribe modale story */}
                <button className="text-teal underline" onClick={() => {}}>
                    {t('unsubscribe')}
                </button>
            </Text>
        </ProfileSubSection>
    );
};

WowDisplaySection.propTypes = {
    wow: PropTypes.object.isRequired,
};

export default WowDisplaySection;
