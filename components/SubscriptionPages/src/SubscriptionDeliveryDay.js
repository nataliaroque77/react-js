import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { nextDay, parseISO } from 'date-fns';
import { useTranslations } from 'use-intl';
import { DropdownInput } from '@colorseven/input';
import { WEEKDAY } from './constants';

const SubscriptionDeliveryDay = ({ earliestDeliveryDate, availableDeliveryDays }) => {
    const t = useTranslations('SubscriptionPages.Delivery');

    const methods = useFormContext();

    const [deliveryDay, setDeliveryDay] = useState(null);

    useEffect(() => {
        // get deliveryDay from localstorage
        let mealKitSubscription = localStorage.getItem('mealKitSubscription');
        mealKitSubscription = mealKitSubscription ? JSON.parse(mealKitSubscription) : {};
        setDeliveryDay(new Date(mealKitSubscription?.deliveryDay?.value));
    }, []);

    const availableDays = useMemo(() => {
        if (earliestDeliveryDate) {
            const earliestDeliveryDateISO = earliestDeliveryDate
                ? parseISO(new Date(earliestDeliveryDate).toISOString())
                : null;
            const earliestDeliveryDateTimezoneOffset = earliestDeliveryDateISO
                ? // to fix the day offset issue which is related to how javascript handles the time conversion;
                  // since it parses to UTC when it converts it to current timezone; it falls 4 hours behind which becomes yesterday
                  earliestDeliveryDateISO.getTime() -
                  earliestDeliveryDateISO.getTimezoneOffset() * -60000
                : null;

            const availableDaysChoose = [
                {
                    label: WEEKDAY[new Date(earliestDeliveryDateTimezoneOffset).getDay()],
                    value: new Date(earliestDeliveryDateTimezoneOffset),
                },
            ];
            for (let i = 0; i < availableDeliveryDays.length; i++) {
                const nextAvaliableDay = nextDay(
                    earliestDeliveryDateTimezoneOffset,
                    WEEKDAY.indexOf(availableDeliveryDays[i]),
                );
                availableDaysChoose.push({
                    label: WEEKDAY[new Date(nextAvaliableDay).getDay()],
                    value: nextAvaliableDay,
                });
            }

            availableDaysChoose.sort((a, b) =>
                new Date(a.value).getTime() > new Date(b.value).getTime() ? 1 : -1,
            );

            return availableDaysChoose;
        }
    }, [earliestDeliveryDate, availableDeliveryDays]);

    if (!availableDays) {
        return null;
    }

    return (
        availableDays &&
        availableDays.length > 0 && (
            <fieldset>
                <legend className="text-lg font-bold">{t('deliveryDayBestForYou')}</legend>
                <DropdownInput
                    className="mt-3"
                    defaultValue={deliveryDay}
                    label={t('deliveryDay')}
                    name="deliveryDay"
                    options={availableDays?.map((availableDay) => ({
                        value: availableDay.value,
                        label: t(`weekday.${availableDay.label}`),
                    }))}
                    {...methods.register('deliveryDay')}
                />
            </fieldset>
        )
    );
};

SubscriptionDeliveryDay.propTypes = {
    earliestDeliveryDate: PropTypes.string,
    availableDeliveryDays: PropTypes.arrayOf(PropTypes.string),
};

export default SubscriptionDeliveryDay;
