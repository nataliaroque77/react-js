/* eslint-disable complexity */
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { useFormContext } from 'react-hook-form';

import { Input, DropdownInput } from '@colorseven/input';
import TextareaCounter from '@colorseven/textarea-counter';

import { PROVINCES, BUILDINGTYPES } from './constants';

const FillInAddress = ({ address, shouldShowComplementaryFields, autoCompeleted }) => {
    const t = useTranslations('AddressForm');
    const methods = useFormContext();
    const {
        register,
        formState: { errors },
    } = methods;

    return (
        <>
            <Input
                className="my-4"
                defaultValue={address.addressLine2}
                label={t('addressLine2')}
                name="addressLine2"
                placeholder={t('addressLine2')}
                {...register('address.addressLine2')}
            />
            {shouldShowComplementaryFields && (
                <>
                    <DropdownInput
                        className="my-4"
                        defaultValue={address.buildingType || BUILDINGTYPES.HOUSE}
                        error={errors?.address?.buildingType?.message || ''}
                        label={t('buildingType')}
                        name="buildingType"
                        options={Object.values(BUILDINGTYPES).map((type) => ({
                            value: type,
                            label: t(`BuildingTypes.${type}`),
                        }))}
                        {...register('address.buildingType')}
                    />

                    <Input
                        className="my-4"
                        defaultValue={address.company}
                        error={errors?.address?.company?.message || ''}
                        label={t('company')}
                        name="company"
                        placeholder={t('company')}
                        {...register('address.company')}
                    />
                </>
            )}
            <Input
                className="my-4"
                defaultValue={address.city}
                error={errors?.address?.city?.message || ''}
                label={t('city')}
                name="city"
                placeholder={t('city')}
                {...register('address.city')}
                autoCompeleted={autoCompeleted}
            />
            <DropdownInput
                className="my-4"
                defaultValue={address.provinceCode}
                error={errors?.address?.provinceCode?.message || ''}
                label={t('provinceCode')}
                name="provinceCode"
                options={PROVINCES}
                {...register('address.provinceCode')}
            />
            <Input
                className="my-4"
                defaultValue={address.postalCode}
                error={errors?.address?.postalCode?.message || ''}
                label={t('postalCode')}
                name="postalCode"
                placeholder={t('postalCode')}
                {...register('address.postalCode')}
                autoCompeleted={autoCompeleted}
            />
            {shouldShowComplementaryFields && (
                <TextareaCounter
                    defaultValue={address.specialInstructions}
                    label={t('specialInstructions')}
                    name="specialInstructions"
                    {...register('address.specialInstructions')}
                />
            )}
        </>
    );
};

FillInAddress.propTypes = {
    address: PropTypes.object.isRequired,
    shouldShowComplementaryFields: PropTypes.bool,
    autoCompeleted: PropTypes.string,
};

export default FillInAddress;
