import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import SubscriptionDeliveryDay from '../../SubscriptionDeliveryDay';
import SubscriptionPlanSummary from '../../SubscriptionPlanSummary';
import PersonalInfoForm from '@colorseven/personal-info-form';
import { AddressForm } from '@colorseven/address-form';
import FormButtonGroup from '../../FormButtonGroup';
import { WEEKDAY } from '../../constants';
import { SCHEMA_DELIVERY } from '@colorseven/validations/src/FormSchemaValidation';
import addToLocalStorage from '../../addToLocalStorage';

const UserInfoEdit = ({ userDetails = {}, address, isGoogleAPILoaded, onSave, onCancel }) => {
    const t = useTranslations('SubscriptionPages.Delivery');

    const methods = useForm({
        resolver: yupResolver(SCHEMA_DELIVERY),
    });
    const { handleSubmit } = methods;

    const defaultValues = {
        userDetails: {
            phone: userDetails.phone,
            last_name: userDetails.last_name,
            first_name: userDetails.first_name,
        },
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
        deliveryDay: userDetails.available_delivery_days?.[0],
    };

    const onSubmit = (data) => {
        const deliveryDay = {
            label: WEEKDAY[new Date(data.deliveryDay).getDay()],
            value: data.deliveryDay,
        };
        const mealKitSubscription = addToLocalStorage(
            'mealKitSubscription',
            'deliveryDay',
            deliveryDay,
            true,
        );
        onSave({ ...data, plan: mealKitSubscription.selectedMealPlan });
    };

    return (
        <div className="w-full md:w-11/12 lg:w-10/12 m-auto flex flex-col md:flex-row justify-between px-4 sm:px-0">
            <div className="w-full md:w-6/12 lg:w-5/12 md:pr-5">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <legend className="text-xl font-bold leading-normal">
                                {t('Title.yourContactInfo')}
                            </legend>
                            <PersonalInfoForm methods={methods} value={userDetails} />
                        </fieldset>
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
                        <SubscriptionDeliveryDay
                            availableDeliveryDays={userDetails?.available_delivery_days || []}
                            earliestDeliveryDate={userDetails?.earliest_delivery_date}
                        />

                        <FormButtonGroup onCancel={onCancel} />
                    </form>
                </FormProvider>
            </div>
            <div className="w-full md:w-6/12 lg:w-5/12">
                <SubscriptionPlanSummary />
            </div>
        </div>
    );
};

UserInfoEdit.propTypes = {
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

export default UserInfoEdit;
