import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    RED: 'red',
    DISABLED: 'disabled',
    LINK: 'link',
    INLINE: 'inline',
    ROUNDPRIMARY: 'roundprimary',
    ROUNDSECONDARY: 'roundsecondary',
    UNDERLINE: 'underline',
};

export const SIZES = {
    SMALL: 'small',
    LARGE: 'large',
};

export const Button = forwardRef(
    ({ variant = VARIANTS.PRIMARY, size = SIZES.LARGE, className, children, ...props }, ref) => {
        const isDisabled = VARIANTS.DISABLED === variant;
        return (
            <button
                className={clsx(
                    {
                        'rounded-full px-4':
                            variant !== VARIANTS.LINK && variant !== VARIANTS.UNDERLINE,
                        'py-2 bg-teal hover:bg-teal-800 text-white font-bold':
                            variant === VARIANTS.PRIMARY,

                        'py-2 font-bold bg-white border border-teal hover:border-teal-800 hover:text-teal-800 text-teal':
                            variant === VARIANTS.SECONDARY,

                        'py-2 font-bold bg-red hover:bg-red-900 text-white':
                            variant === VARIANTS.RED,

                        'py-2 font-bold bg-gray text-white cursor-not-allowed':
                            variant === VARIANTS.DISABLED,
                        'text-teal text-sm background-transparent': variant === VARIANTS.LINK,
                        'font-bold bg-white border border-teal hover:border-teal-800 hover:text-teal-800 text-teal':
                            variant === VARIANTS.INLINE,
                        'h-10 w-10 md:h-5 md:w-5 flex items-center justify-center bg-teal hover:bg-teal-800 text-white font-bold':
                            variant === VARIANTS.ROUNDPRIMARY,
                        'h-10 w-10 md:h-5 md:w-5 flex items-center justify-center bg-white border border-teal hover:border-teal-800 hover:text-teal-800 text-teal':
                            variant === VARIANTS.ROUNDSECONDARY,
                        'underline text-teal background-transparent':
                            variant === VARIANTS.UNDERLINE,

                        'text-sm': size === SIZES.SMALL,
                        'text-base': size === SIZES.LARGE,
                    },
                    className,
                )}
                data-testid="button"
                disabled={isDisabled}
                ref={ref}
                type="button"
                {...props}
            >
                {children}
            </button>
        );
    },
);
Button.displayName = 'Button';

Button.propTypes = {
    /** variation of Button */
    variant: PropTypes.oneOf(Object.values(VARIANTS)),
    /** Primary variant */
    primary: PropTypes.bool,
    /** Small or Large size of button */
    size: PropTypes.oneOf(Object.values(SIZES)),
    className: PropTypes.string,
    /** any children */
    children: PropTypes.any.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func,
};

export default Button;
