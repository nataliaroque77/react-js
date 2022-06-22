import * as yup from 'yup';
import { postalCodeACRegEx } from './regex';

const address = {
    address: yup.object().shape({
        addressLine1: yup.string().required('Field is required'),
        city: yup.string().required('Field is required'),
        postalCode: yup
            .string()
            .matches(postalCodeACRegEx, {
                message: 'Please enter a valid postal code (For example A1A 1A1)',
            })
            .required('Field is required'),
        company: yup.string().when('buildingType', {
            is: 'office',
            then: yup.string().required('Field is required'),
            otherwise: yup.string(),
        }),
    }),
};

const personal_info = {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup
        .string()
        .required()
        .test('phone', 'phone', (value) => {
            let normalizedPhone = '';
            if (value?.replace) {
                normalizedPhone = value.replace(/[-+. ()]/g, '').replace(/^1/, '');
            }
            return /^\d{10}$/.test(normalizedPhone);
        }),
};

export const SCHEMA_ADDRESS = yup.object().shape({
    ...address,
});

export const SCHEMA_PAYMENT = yup.object().shape({
    nameOnCard: yup.string().required(),
    ...address,
});

export const SCHEMA_PERSONAL_INFO = yup.object().shape({
    ...personal_info,
});

export const SCHEMA_DELIVERY = yup.object().shape({
    ...personal_info,
    ...address,
});
