import PropTypes from 'prop-types';
import Text from '@colorseven/text';

const SubscriptionDisplayTextPair = ({ fieldName, value, className }) => {
    return (
        <div
            className={`space-y-1 mb-5 items-center ${className}`}
            data-testid="subscription-display-text-pair"
        >
            <Text className="text-sm">{fieldName}</Text>
            <Text className="text-base font-bold">{value}</Text>
        </div>
    );
};

SubscriptionDisplayTextPair.propTypes = {
    fieldName: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
};

export default SubscriptionDisplayTextPair;
