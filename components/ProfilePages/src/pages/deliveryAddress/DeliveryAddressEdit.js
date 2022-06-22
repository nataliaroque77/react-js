import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import Alert from '@colorseven/alert';
import { AddressForm } from '@colorseven/address-form';
import ProfileButtonGroup from '@colorseven/profile-button-group';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';
import { SCHEMA_ADDRESS } from '@colorseven/validations/src/FormSchemaValidation';

const DeliveryAddressEdit = ({ address, onSave, onCancel, isGoogleAPILoaded, hasServerError }) => {
    const t = useTranslations('ProfilePage.User');

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

    return (
        <div className="pb-5">
            <ProfileSubSection>
                <Heading isAdd={false} isEdit={false}>
                    {t('Address.heading')}
                </Heading>
                <FormProvider {...methods}>
                    <form className="w-64 md:w-72 mb-11" onSubmit={handleSubmit(onSave)}>
                        <AddressForm
                            address={defaultValues.address}
                            isGoogleAPILoaded={isGoogleAPILoaded}
                            shouldShowComplementaryFields={true}
                        />
                        <div className="mb-9" />
                        {hasServerError && (
                            <span className="block mb-9">
                                <Alert>{t('Address.serverError')}</Alert>
                            </span>
                        )}

                        <ProfileButtonGroup onCancel={onCancel} />
                    </form>
                </FormProvider>
            </ProfileSubSection>
        </div>
    );
};

DeliveryAddressEdit.propTypes = {
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
    hasServerError: PropTypes.bool.isRequired,
};

export default DeliveryAddressEdit;
