import PropTypes from 'prop-types';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';
import PaymentReadOnly from './PaymentReadOnly';
import UserAddressReadOnly from './UserAddressReadOnly';
import SkipPlan from '../../SkipPlan';

const SubscriptionPayment = ({ payment, address, onSave }) => {
    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between px-4 sm:px-0">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-5">
                {payment && <PaymentReadOnly payment={payment} onSave={onSave} />}
            </div>
            <div className="w-full md:w-6/12 lg:w-5/12">
                <SubscriptionPlanSummary />
                {address && <UserAddressReadOnly address={address} />}
                <SkipPlan />
            </div>
        </div>
    );
};

SubscriptionPayment.propTypes = {
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
    payment: PropTypes.object,
    onSave: PropTypes.func,
};

export default SubscriptionPayment;

export async function getServerSideProps({ locale }) {
    const messages = {
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`@colorseven/stripe-payment-form/locales/${locale}.json`),
    };

    return {
        props: {
            messages,
        },
    };
}
