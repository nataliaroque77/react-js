import PropTypes from 'prop-types';
import Text from '@colorseven/text';
import Title from '@colorseven/title';
import { useTranslations } from 'use-intl';

const ProfilePageTitle = ({ firstName, lastName, email, storeCredit, className }) => {
    const t = useTranslations('ProfilePage.Heading');

    return (
        <div className={className}>
            <Title className="text-xl text-teal-800 font-bold">
                {getDisplayName({ firstName, lastName, email })}
            </Title>
            <Text className="text-xs">
                {t('storeCredit', {
                    storeCredit,
                })}
            </Text>
        </div>
    );
};

function getDisplayName({ firstName, lastName, email }) {
    let displayName = email;

    if (firstName && lastName) {
        displayName = `${firstName} ${lastName}`;
    }

    return displayName;
}

ProfilePageTitle.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    storeCredit: PropTypes.number,
    className: PropTypes.string,
};

export default ProfilePageTitle;
