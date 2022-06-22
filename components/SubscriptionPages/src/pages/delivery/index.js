import PropTypes from 'prop-types';
import UserInfoReadOnly from './UserInfoReadOnly';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';

const SubscriptionDelivery = ({ userDetails, address, toNextStep }) => {
    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between px-4 sm:px-0">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-5">
                {(userDetails || address) && (
                    <UserInfoReadOnly
                        address={address}
                        toNextStep={toNextStep}
                        userDetails={userDetails}
                    />
                )}
            </div>
            <div className="w-full md:w-6/12 lg:w-5/12">
                <SubscriptionPlanSummary />
            </div>
        </div>
    );
};

SubscriptionDelivery.propTypes = {
    userDetails: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        phone: PropTypes.string,
    }),
    address: PropTypes.shape({
        id: PropTypes.string,
        user_id: PropTypes.string,
        address_line_1: PropTypes.string,
        address_line_2: PropTypes.string,
        building_type: PropTypes.string,
        company: PropTypes.string,
        city: PropTypes.string,
        province_code: PropTypes.string,
        country_code: PropTypes.string,
        postal_code: PropTypes.string,
        special_instructions: PropTypes.string,
        is_default: PropTypes.bool,
        fsa: PropTypes.string,
    }),
    toNextStep: PropTypes.func,
};

export default SubscriptionDelivery;
