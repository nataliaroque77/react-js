import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import UpdatePassword from '@colorseven/update-password';

import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';

const PasswordEdit = ({ onSave, onCancel, errOccuredTimestamp, hasServerError }) => {
    const t = useTranslations('ProfilePage.User.Password');
    return (
        <div className="pb-5">
            <ProfileSubSection>
                <Heading href="/profile/user/password" isAdd={false} isEdit={false}>
                    {t('heading')}
                </Heading>
                <UpdatePassword
                    errOccuredTimestamp={errOccuredTimestamp}
                    hasServerError={hasServerError}
                    onCancel={onCancel}
                    onSave={onSave}
                />
            </ProfileSubSection>
        </div>
    );
};

PasswordEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errOccuredTimestamp: PropTypes.string.isRequired,
    hasServerError: PropTypes.bool.isRequired,
};

export default PasswordEdit;
