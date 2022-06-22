import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import ShareWithFriends from '@colorseven/share-with-friends';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';

const ProfileShare = ({ sendEmail, sendEmailResult, referral, facebookAppId }) => {
    const t = useTranslations('ProfilePage.Share');

    return (
        <ProfileSubSection>
            <Heading isEdit={false}>{t('heading')}</Heading>
            <ShareWithFriends
                facebookAppId={facebookAppId}
                referral={referral}
                sendEmail={sendEmail}
                sendEmailResult={sendEmailResult}
            />
        </ProfileSubSection>
    );
};

ProfileShare.propTypes = {
    referral: PropTypes.shape({
        freebox: PropTypes.shape({
            sent: PropTypes.number,
            remaining: PropTypes.number,
        }),
        giveget: PropTypes.shape({
            is_active: PropTypes.bool,
            give: PropTypes.number,
            get: PropTypes.number,
            shareable_url: PropTypes.string,
        }),
    }),
    sendEmail: PropTypes.func.isRequired,
    sendEmailResult: PropTypes.shape({
        error: PropTypes.string,
        errorTimeStamp: PropTypes.string,
        successTimeStamp: PropTypes.string,
    }).isRequired,
    facebookAppId: PropTypes.string.isRequired,
};

export default ProfileShare;
