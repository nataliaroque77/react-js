import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { useFormContext } from 'react-hook-form';

import FillInAddress from './FillInAddress';
import SearchAddress from './SearchAddress';
import { BUILDINGTYPES } from './constants';

import { Input } from '@colorseven/input';

const AddressForm = ({ address = {}, isGoogleAPILoaded, shouldShowComplementaryFields }) => {
    const t = useTranslations('AddressForm');
    const [autoCompeleted, setAutoCompeleted] = useState(null);

    // All these values are from the component's parent <form />
    const methods = useFormContext();
    const {
        register,
        formState: { errors },
    } = methods;

    return (
        <>
            {isGoogleAPILoaded ? (
                <SearchAddress
                    autoCompeleted={autoCompeleted}
                    setAutoCompeleted={setAutoCompeleted}
                    street={address.addressLine1}
                />
            ) : (
                <Input
                    className="my-4"
                    defaultValue={address.addressLine1 || ''}
                    error={errors?.address?.addressLine1?.message || ''}
                    label={t('addressLine1')}
                    name="address.addressLine1"
                    placeholder={t('addressLine1')}
                    {...register('address.addressLine1')}
                />
            )}

            <FillInAddress
                address={address}
                autoCompeleted={autoCompeleted}
                shouldShowComplementaryFields={shouldShowComplementaryFields}
            />
        </>
    );
};

AddressForm.propTypes = {
    address: PropTypes.shape({
        addressLine1: PropTypes.string,
        addressLine2: PropTypes.string,
        buildingType: PropTypes.oneOf([Object.values(BUILDINGTYPES)]),
        city: PropTypes.string,
        company: PropTypes.string,
        countryCode: PropTypes.string,
        postalCode: PropTypes.string,
        provinceCode: PropTypes.string,
        specialInstructions: PropTypes.string,
    }),
    isGoogleAPILoaded: PropTypes.bool.isRequired,
    shouldShowComplementaryFields: PropTypes.bool,
};

export default AddressForm;
