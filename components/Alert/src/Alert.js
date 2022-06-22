import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Alert as AlertIcon } from '@colorseven/icons';

const SIZES = {
    SM: 'small',
    MD: 'medium',
    LG: 'large',
};

const Alert = ({ size = SIZES.SM, children }) => {
    return (
        <div
            className={clsx('bg-red-200 flex flex-row w-full px-3 py-2 rounded-sm', {
                'text-xs': size === SIZES.SM,
                'text-base': size === SIZES.MD,
                'text-lg': size === SIZES.LG,
            })}
            data-testid="alert"
            role="alert"
        >
            <span>
                <AlertIcon size={size} />
            </span>
            <span className="ml-2">{children}</span>
        </div>
    );
};

Alert.propTypes = {
    size: PropTypes.oneOf(Object.values(SIZES)),
    children: PropTypes.node.isRequired,
};

Alert.SIZES = SIZES;

export default Alert;
