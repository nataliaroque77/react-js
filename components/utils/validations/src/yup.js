import * as yup from 'yup';

import { PASSWORD_SCHEMA_REQUIREMENT_NAME } from './constants';

export const passwordSchemaLegacy = yup.string().required();

export const passwordSchema = passwordSchemaLegacy
    .min(8)
    .matches(/[a-z]+/, { name: PASSWORD_SCHEMA_REQUIREMENT_NAME.LOWER_CASE })
    .matches(/[A-Z]+/, { name: PASSWORD_SCHEMA_REQUIREMENT_NAME.UPPER_CASE })
    .matches(/[0-9]+/, { name: PASSWORD_SCHEMA_REQUIREMENT_NAME.DIGIT });
