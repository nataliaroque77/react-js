import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import { PreferenceList, InterestList, mapPreferenceIcon } from '@colorseven/meal-preferences';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';

const PreferencesDisplaySection = ({ locale, mealPreferences, userPreferences }) => {
    const t = useTranslations('ProfilePage.Subscriptions.Preferences');

    const preferList = useMemo(
        () =>
            mealPreferences.preferences
                .filter((preference) => userPreferences.preferences.includes(preference.tag))
                .map((pre) => ({
                    code: pre.tag,
                    icon: mapPreferenceIcon(pre.tag),
                    title: locale === 'en-CA' ? pre.title_en : pre.title_fr,
                })),
        [locale, mealPreferences.preferences, userPreferences.preferences],
    );

    const intList = useMemo(
        () =>
            mealPreferences.interests
                .filter((interest) => userPreferences.interests.includes(interest.tag))
                .map((int) => ({
                    code: int.tag,
                    title: locale === 'en-CA' ? int.title_en : int.title_fr,
                })),
        [locale, mealPreferences.interests, userPreferences.interests],
    );

    return (
        <ProfileSubSection>
            <Heading href="/profile/subscriptions/preferences" isAdd={false} isEdit={true}>
                {t('heading')}
            </Heading>
            <PreferenceList preferences={preferList} />
            <InterestList interests={intList} />
            <div className="mb-10" />
        </ProfileSubSection>
    );
};

PreferencesDisplaySection.propTypes = {
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']).isRequired,
    mealPreferences: PropTypes.shape({
        preferences: PropTypes.arrayOf(
            PropTypes.shape({
                tag: PropTypes.string.isRequired,
                title_en: PropTypes.string.isRequired,
                title_fr: PropTypes.string.isRequired,
            }),
        ),
        interests: PropTypes.arrayOf(
            PropTypes.shape({
                tag: PropTypes.string.isRequired,
                title_en: PropTypes.string.isRequired,
                title_fr: PropTypes.string.isRequired,
            }),
        ),
    }),
    userPreferences: PropTypes.shape({
        preferences: PropTypes.arrayOf(PropTypes.string),
        interests: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default PreferencesDisplaySection;
