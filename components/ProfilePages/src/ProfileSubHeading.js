import PropTypes from 'prop-types';
import Title from '@colorseven/title';

const ProfileSubHeading = ({ className = '', children }) => {
    return (
        <Title className={`text-xl text-teal-800 font-bold ${className}`} size={2}>
            {children}
        </Title>
    );
};

ProfileSubHeading.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default ProfileSubHeading;
