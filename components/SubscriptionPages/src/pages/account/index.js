import PropTypes from 'prop-types';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';

const SubscriptionAccount = ({ children }) => {
    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-7/12 lg:w-7/12 pr-40">{children}</div>
            <div className="w-full md:w-5/12 lg:w-5/12">
                <SubscriptionPlanSummary />
            </div>
        </div>
    );
};

SubscriptionAccount.propTypes = {
    children: PropTypes.node,
};

export default SubscriptionAccount;
