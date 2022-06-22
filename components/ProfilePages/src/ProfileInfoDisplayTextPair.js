import PropTypes from 'prop-types';
import Text from '@colorseven/text';

const ProfileInfoDisplayTextPair = ({ fieldName, value, className }) => {
    return (
        <div
            className={`space-y-1 mb-5 items-center ${className}`}
            data-testid="profile-display-text-pair"
        >
            <Text className="text-xs">{fieldName}</Text>
            <Text className="text-sm font-bold">{value}</Text>
        </div>
    );
};

ProfileInfoDisplayTextPair.propTypes = {
    fieldName: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
};

export default ProfileInfoDisplayTextPair;
