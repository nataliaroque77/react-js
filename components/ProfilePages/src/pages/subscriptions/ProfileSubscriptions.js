import PropTypes from 'prop-types';

import WowDisplaySection from './WowDisplaySection';
import ProfileSubSection from '../../ProfileSubSection';
import MealkitDisplaySection from './MealkitDispalySection';
import PreferencesDisplaySection from './PreferencesDisplaySection';
import { MealkitNoSubscription, WowNoSubscription } from './NoSubscriptionContents';

const ProfileSubscriptions = ({ locale, mealkit, wow }) => {
    const { isSubscribed, userPlan, mealPreferences, userPreferences } = mealkit;
    return (
        <>
            {isSubscribed ? (
                <>
                    <MealkitDisplaySection userPlan={userPlan} />
                    <PreferencesDisplaySection
                        locale={locale}
                        mealPreferences={mealPreferences}
                        userPreferences={userPreferences}
                    />
                </>
            ) : (
                <ProfileSubSection>
                    <MealkitNoSubscription />
                </ProfileSubSection>
            )}
            {wow?.isSubscribed ? <WowDisplaySection wow={wow} /> : <WowNoSubscription />}
        </>
    );
};

ProfileSubscriptions.propTypes = {
    wow: PropTypes.object.isRequired,
    mealkit: PropTypes.object.isRequired,
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']).isRequired,
};

export default ProfileSubscriptions;
