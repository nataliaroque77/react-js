import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import useOnclickOutside from 'react-cool-onclickoutside';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { useFormContext } from 'react-hook-form';
import { BUILDINGTYPES } from './constants';

import Text from '@colorseven/text';
import { Input } from '@colorseven/input';
import { Location } from '@colorseven/icons';

const SearchAddress = ({ street, requestOptions = {}, autoCompeleted, setAutoCompeleted }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: 'ca' },
            ...requestOptions,
        },
        debounce: 300,
    });

    const t = useTranslations('AddressForm');
    const [place, setPlace] = useState({});
    const [currentStreet, setCurrentStreet] = useState(street);
    const [isPlaceSelected, setIsPlaceSelected] = useState(false);
    const methods = useFormContext();

    useEffect(() => {
        setValue(value, false);
    }, [setValue, value]);

    useEffect(() => {
        const triggerInputChange = () => setAutoCompeleted(new Date().toISOString());
        function fillInAddress() {
            let address = {};

            // Get the place details from the autocomplete object and setup form
            if (place['address_components']?.length) {
                place['address_components'].forEach((component) => {
                    const componentType = component.types[0];
                    if (
                        componentType === 'route' ||
                        componentType === 'administrative_area_level_1'
                    ) {
                        address[componentType] = component.short_name;
                    } else {
                        address[componentType] = component.long_name;
                    }
                });

                const streetNum = address['street_number'] ? address['street_number'] + ' ' : '';
                const route = address['route'] || '';
                const addressLine1 = `${streetNum}${route}`;

                setCurrentStreet(addressLine1);
                methods.setValue(
                    'address',
                    {
                        addressLine1,
                        addressLine2: '',
                        buildingType: BUILDINGTYPES.HOUSE,
                        company: '',
                        city: address['locality'] || '',
                        provinceCode: address['administrative_area_level_1'] || '',
                        postalCode: address['postal_code'] || '',
                    },
                    { shouldValidate: true },
                );
                setPlace({});
                setIsPlaceSelected(false);
                triggerInputChange();
            }
        }

        if (place && isPlaceSelected) fillInAddress();
    }, [place, isPlaceSelected, methods, setAutoCompeleted]);

    // When user clicks outside of the component to dismiss searched suggestions
    const ref = useOnclickOutside(() => clearSuggestions());

    // Update the keyword of the input element
    const handleChangeInput = (e) => {
        setCurrentStreet(e.target.value);
        methods.setValue('address.addressLine1', e.target.value);
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
        () => {
            // When user selects a place to replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude
            getGeocode({ address: description })
                .then((results) => {
                    setPlace(results[0]);
                    setIsPlaceSelected(true);
                })
                .catch((error) => {
                    console.log({ error });
                });
        };

    const renderResults = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
                <li className="p-2" key={place_id}>
                    <button onClick={handleSelect(suggestion)}>
                        <span className="items-center flex flex-row">
                            <Location />
                            <Text
                                Tag="span"
                                className="pl-1 w-11/12 block font-bold text-sm overflow-auto text-left"
                            >
                                {main_text}
                            </Text>
                        </span>
                        {secondary_text && (
                            <Text
                                Tag="span"
                                className="pl-5 w-full text-xs inline-block overflow-auto text-left"
                            >
                                {secondary_text}
                            </Text>
                        )}
                    </button>
                </li>
            );
        });
    return (
        <div ref={ref}>
            {/* This input is used to detect error for auto-compelete street Input, as yup disables onChange which is required for autoCompletion */}
            <input
                type="hidden"
                value={currentStreet}
                {...methods.register('address.addressLine1')}
                autoCompeleted={autoCompeleted}
            />

            <Input
                className="my-4"
                disabled={!ready}
                error={methods?.formState.errors?.address?.addressLine1?.message || ''}
                label={t('addressLine1')}
                name="address.addressLine1"
                placeholder={t('addressLine1')}
                value={currentStreet}
                onChange={handleChangeInput}
            />
            {status === 'OK' && (
                <ul className="origin-top-right absolute -mt-5 w-64 md:w-72 p-2 rounded-bl-sm rounded-br-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 border border-teal border-t-0 text-gray-700">
                    {renderResults()}
                </ul>
            )}
        </div>
    );
};

SearchAddress.propTypes = {
    street: PropTypes.string,
    requestOptions: PropTypes.object,
    methods: PropTypes.object,
    autoCompeleted: PropTypes.string,
    setAutoCompeleted: PropTypes.func,
};

export default SearchAddress;
