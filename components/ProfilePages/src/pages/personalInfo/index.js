import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';
import ProfileInfoDisplayTextPair from '../../ProfileInfoDisplayTextPair';

const PersonalInfo = ({ userDetails }) => {
    const t = useTranslations('ProfilePage.User');

    const { first_name, last_name, phone } = userDetails;

    const notAvailable = t('notAvailable');

    return (
        <ProfileSubSection>
            <Heading href="/profile/user/personal-info" isAdd={!phone} isEdit={!!phone}>
                {t('UserDetails.heading')}
            </Heading>
            <div className="pt-5">
                <ProfileInfoDisplayTextPair
                    fieldName={t('UserDetails.Title.fullName')}
                    value={first_name ? `${last_name} ${first_name}` : notAvailable}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('UserDetails.Title.phone')}
                    value={phone || notAvailable}
                />
            </div>
        </ProfileSubSection>
    );
};

PersonalInfo.propTypes = {
    userDetails: PropTypes.object,
};

export default PersonalInfo;
