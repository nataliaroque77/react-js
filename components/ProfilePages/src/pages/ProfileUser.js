import PropTypes from 'prop-types';

import PersonalInfo from '../pages/personalInfo';
import DeliveryAddress from '../pages/deliveryAddress';
import UpdatePassword from '../pages/password';

const ProfileUser = ({ userDetails, address }) => {
    return (
        <div className="mb-10">
            <PersonalInfo userDetails={userDetails} />
            <UpdatePassword />
            <DeliveryAddress address={address} />
        </div>
    );
};

ProfileUser.propTypes = {
    userDetails: PropTypes.object,
    address: PropTypes.object,
};

export default ProfileUser;
