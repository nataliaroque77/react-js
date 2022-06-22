/* eslint-disable complexity */
import PropTypes from 'prop-types';
import clsx from 'clsx';

const StripeElementWrapper = ({
    name,
    label,
    className,
    placeholder,
    inlineElement,
    error,
    stripeElement,
    hasValue,
    isFocused,
}) => {
    const isError = !!error;
    const testidBase = `${name}-input`;
    return (
        <div className={className}>
            <div
                className={clsx(
                    'relative h-14 px-2 py-1 border rounded-sm flex flex-row items-center transition-colors ease-linear',
                    { 'outline-black border-teal': isFocused },
                    { 'border-gray-700': !isFocused && !isError },
                    { 'border-red': isError && !isFocused },
                )}
                data-testid={testidBase}
            >
                <label
                    className={clsx(
                        'absolute z-0',
                        'w-full text-xs font-bold transition-transform ease-linear transform',
                        { 'scale-100 translate-y-0 translate-x-0 text-teal': isFocused },
                        { 'scale-105 translate-y-3 translate-x-2': !hasValue && !isFocused },
                        { 'text-gray-700': !isFocused && !isError },
                        { 'text-red': isError && !isFocused },
                    )}
                    data-testid={`${testidBase}-label`}
                >
                    <span className="block w-full" data-testid={`${testidBase}-label-text`}>
                        {label}
                    </span>
                    <input
                        readOnly
                        className={clsx(
                            'appearance-none w-11/12 text-base md:text-sm outline-none flex-grow transition-opacity ease-in-out',
                            { 'opacity-100': isFocused && !hasValue },
                            { 'opacity-0': hasValue || !isFocused },
                        )}
                        data-testid={`${testidBase}-input`}
                        name={name}
                        placeholder={placeholder}
                        tabIndex="-1"
                    />
                </label>
                {stripeElement && stripeElement}
                <div className="absolute right-3.5 z-20">
                    {inlineElement && (
                        <span className="ml-2" data-testid={`${testidBase}-inline-element`}>
                            {inlineElement}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

StripeElementWrapper.displayName = 'StripeElementWrapper';

StripeElementWrapper.propTypes = {
    /** the name of the input & used to generate a unique id */
    name: PropTypes.string.isRequired,
    /** any classes that you'd like to append to the container */
    className: PropTypes.string,
    /** if available, will render a label for the input */
    label: PropTypes.string.isRequired,
    /** the placeholder text of the input */
    placeholder: PropTypes.string,
    /** optionally renders an element inline to the right of the input */
    inlineElement: PropTypes.node,
    /** displays a message below the input & styles the input to indicate there is an error */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** an indicator if passed stripeElement has value */
    hasValue: PropTypes.bool.isRequired,
    /** an indicator if passed stripeElement is focused */
    isFocused: PropTypes.bool.isRequired,
    /** a stripe element */
    stripeElement: PropTypes.node.isRequired,
};

export default StripeElementWrapper;
