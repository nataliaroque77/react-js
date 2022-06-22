import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';
import { PreferencesForm, mapPreferenceIcon } from '@colorseven/meal-preferences';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';

const PreferencesEdit = ({
    locale,
    preferences,
    userPreferences,
    onCancelRedirect,
    onSaveUserPrefer,
}) => {
    const t = useTranslations('ProfilePage.Subscriptions.Preferences');
    const { interests: interestList = [], preferences: preferList = [] } = preferences;
    const { interests: userIntList = [], preferences: userPreferList = [] } = userPreferences;

    const preList = useMemo(
        () =>
            preferList.map((preference) => ({
                code: preference.tag,
                icon: mapPreferenceIcon(preference.tag),
                isDefaultChecked: userPreferList.includes(preference.tag),
                title: locale === 'en-CA' ? preference.title_en : preference.title_fr,
            })),
        [locale, preferList, userPreferList],
    );

    const intList = useMemo(
        () =>
            interestList.map((interest) => ({
                code: interest.tag,
                isDefaultChecked: userIntList.includes(interest.tag),
                title: locale === 'en-CA' ? interest.title_en : interest.title_fr,
            })),
        [locale, interestList, userIntList],
    );

    return (
        <ProfileSubSection>
            <Heading>{t('heading')}</Heading>
            <Text className="mb-3 text-xs">{t('description')}</Text>
            <PreferencesForm
                interests={intList}
                isInitState={!userPreferList.length}
                preferences={preList}
                onCancel={onCancelRedirect}
                onSave={onSaveUserPrefer}
            />
        </ProfileSubSection>
    );
};

PreferencesEdit.propTypes = {
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']).isRequired,
    preferences: PropTypes.shape({
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
    userPreferences: PropTypes.object,
    onCancelRedirect: PropTypes.func.isRequired,
    onSaveUserPrefer: PropTypes.func.isRequired,
};

export default PreferencesEdit;
