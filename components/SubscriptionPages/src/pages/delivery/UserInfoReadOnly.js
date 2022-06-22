import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { useForm, FormProvider } from 'react-hook-form';

import SubscriptionDisplayTextPair from '../../SubscriptionDisplayTextPair';
import SubscriptionDeliveryDay from '../../SubscriptionDeliveryDay';
import Title from '@colorseven/title';
import Button from '@colorseven/button';
import { NextLink } from '@colorseven/link';

import { WEEKDAY } from '../../constants';
import addToLocalStorage from '../../addToLocalStorage';

const UserInfoReadOnly = ({ userDetails, address, toNextStep }) => {
    const t = useTranslations('SubscriptionPages.Delivery');
    const testidBase = 'subscription-delivery-user-read-only';
    const notAvailable = t('notAvailable');

    const { first_name, last_name, phone } = userDetails;
    const { address_line_1, address_line_2, city, province_code, postal_code, building_type } =
        address;
    const getFieldValue = (titleType) => (address_line_1 ? address[titleType] : notAvailable);
    const getTypeOfResidence = () =>
        building_type ? t(`BuildingTypes.${building_type}`) : notAvailable;
    const addressValue = address_line_1
        ? `${
              address_line_2 ? address_line_2 + ' - ' : ''
          }${address_line_1}, ${city}, ${province_code}, ${postal_code}`
        : notAvailable;

    const methods = useForm({
        mode: 'onChange',
    });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        const deliveryDay = {
            label: WEEKDAY[new Date(data.deliveryDay).getDay()],
            value: data.deliveryDay,
        };
        addToLocalStorage('mealKitSubscription', 'deliveryDay', deliveryDay);
        toNextStep();
    };

    return (
        <div>
            <div className="mb-5">
                <Title className="text-lg font-bold leading-normal inline-block" size={2}>
                    {t('Title.yourContactInfo')}
                </Title>
                <NextLink
                    className="text-teal underline ml-5 md:ml-10"
                    href="/subscriptions/delivery/edit"
                >
                    <span> {t('Title.change')}</span>
                </NextLink>
            </div>

            <div className="ml-5 mb-5">
                <SubscriptionDisplayTextPair
                    fieldName={t('Title.fullName')}
                    value={first_name ? `${last_name} ${first_name}` : notAvailable}
                />
                <SubscriptionDisplayTextPair
                    fieldName={t('Title.phone')}
                    value={phone || notAvailable}
                />
            </div>

            <div className="ml-5 mb-5">
                <SubscriptionDisplayTextPair
                    fieldName={t('Title.streetAddress')}
                    value={addressValue}
                />
                <SubscriptionDisplayTextPair
                    fieldName={t('Title.typeOfResidence')}
                    value={getTypeOfResidence()}
                />
                <SubscriptionDisplayTextPair
                    fieldName={t('Title.deliveryInstructions')}
                    value={getFieldValue('special_instructions')}
                />
            </div>

            <div className="mt-12 mb-2">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SubscriptionDeliveryDay
                            availableDeliveryDays={userDetails.available_delivery_days || []}
                            earliestDeliveryDate={userDetails.earliest_delivery_date}
                        />
                        <Button
                            className="flex-1 w-full md:w-9/12 my-5"
                            data-testid={`${testidBase}-cta`}
                            type="submit"
                        >
                            {t('continue')}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

UserInfoReadOnly.propTypes = {
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
    toNextStep: PropTypes.func.isRequired,
};

export default UserInfoReadOnly;
