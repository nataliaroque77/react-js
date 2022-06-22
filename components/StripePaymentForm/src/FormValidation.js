import * as yup from 'yup';
import { postalCodeACRegEx } from '@colorseven/validations';

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

export const SCHEMA_ADDRESS = yup.object().shape({
    ...address,
});

export const SCHEMA_PAYMENT = yup.object().shape({
    nameOnCard: yup.string().required(),
    ...address,
});
