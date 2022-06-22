import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';
import { AddressForm } from '@colorseven/address-form';

import { SCHEMA_ADDRESS } from '@colorseven/validations/src/FormSchemaValidation';
import FormButtonGroup from '../../FormButtonGroup';
import SkipPlan from '../../SkipPlan';

const UserAddressEdit = ({ address, isGoogleAPILoaded, onSave, onCancel }) => {
    const t = useTranslations('SubscriptionPages.Delivery');

    const defaultValues = {
        address: {
            addressLine1: address.address_line_1,
            addressLine2: address.address_line_2,
            buildingType: address.building_type,
            city: address.city,
            company: address.company,
            countryCode: address.country_code,
            postalCode: address.postal_code,
            provinceCode: address.province_code,
            specialInstructions: address.special_instructions,
        },
    };

    const methods = useForm({
        resolver: yupResolver(SCHEMA_ADDRESS),
        defaultValues,
    });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between px-4 sm:px-0 mt-10">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-5">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <legend className="text-xl font-semibold leading-normal">
                                {t('Title.yourAddress')}
                            </legend>
                            <AddressForm
                                address={defaultValues.address}
                                isGoogleAPILoaded={isGoogleAPILoaded}
                                shouldShowComplementaryFields={true}
                            />
                        </fieldset>
                        <FormButtonGroup onCancel={onCancel} />
                    </form>
                </FormProvider>
            </div>
            <div className="w-full md:w-6/12 lg:w-5/12">
                <SubscriptionPlanSummary />
                <SkipPlan />
            </div>
        </div>
    );
};

UserAddressEdit.propTypes = {
    userDetails: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        phone: PropTypes.string,
        available_delivery_days: PropTypes.arrayOf(PropTypes.string),
        earliest_delivery_date: PropTypes.string,
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
    isGoogleAPILoaded: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default UserAddressEdit;
