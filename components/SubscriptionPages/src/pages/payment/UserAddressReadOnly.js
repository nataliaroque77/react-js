import PropTypes from 'prop-types';
import { useTranslations, useIntl } from 'use-intl';
import { useEffect, useState } from 'react';

import Title from '@colorseven/title';
import Text from '@colorseven/text';

import { NextLink } from '@colorseven/link';

const UserAddressReadOnly = ({ address }) => {
    const t = useTranslations('SubscriptionPages.Delivery');
    const notAvailable = t('notAvailable');
    const { formatDateTime } = useIntl();

    const { address_line_1, address_line_2, city, province_code, postal_code } = address;

    const addressValue = address_line_1
        ? `${
              address_line_2 ? address_line_2 + ' - ' : ''
          }${address_line_1}, ${city}, ${province_code}, ${postal_code}`
        : notAvailable;

    const [deliveryDay, setDeliveryDay] = useState(null);

    useEffect(() => {
        let mealKitSubscription = localStorage.getItem('mealKitSubscription');
        mealKitSubscription = mealKitSubscription ? JSON.parse(mealKitSubscription) : {};
        setDeliveryDay(new Date(mealKitSubscription?.deliveryDay?.value));
    }, []);

    return (
        <div className="flex flex-col bg-gray-100 rounded-md overflow-hidden mt-4 py-8 px-6">
            <div className="flex flex-row justify-between mb-5">
                <Title className="text-xl font-bold leading-normal tracking-tight" size={2}>
                    {t('Title.deliveryInformation')}
                </Title>
                <NextLink
                    className="text-teal text-lg tracking-tight underline"
                    href="/subscriptions/payment/editaddress"
                >
                    <span>Change</span>
                </NextLink>
            </div>

            <div className="space-y-1 mb-5">
                <Text className="text-lg font-bold tracking-tight">
                    {t('Title.deliveryAddress')}
                </Text>
                <Text className="text-lg font-medium leading-3">{addressValue}</Text>
            </div>

            <div className="space-y-1">
                <Text className="text-lg font-bold tracking-tight">{t('Title.firstDelivery')}</Text>
                <Text className="text-lg font-medium leading-3">
                    {formatDateTime(deliveryDay, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </Text>
            </div>
        </div>
    );
};

UserAddressReadOnly.propTypes = {
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
};

export default UserAddressReadOnly;
