import { IntlProvider } from 'use-intl';
import { useForm, FormProvider } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { yupResolver } from '@hookform/resolvers/yup';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { SCHEMA_ADDRESS } from '@colorseven/validations/src/FormSchemaValidation';

import FillInAddress from '../src/FillInAddress';

const address = {
    addressLine2: '1210',
    buildingType: 'house',
    company: '',
    city: 'Toronto',
    provinceCode: 'ON',
    postalCode: 'M4S 2H2',
    specialInstructions: '0123456789',
};

const updatedAddress = {
    addressLine2: '1510',
    buildingType: 'office',
    company: 'RBC',
    city: 'Toronto',
    provinceCode: 'ON',
    postalCode: 'M4B 6A7',
    specialInstructions: 'Testing....',
};

describe('<FillingAddress />', () => {
    // eslint-disable-next-line no-unused-vars
    describe.each(['en-CA', 'fr-CA'])('when locale=%p', (_) => {
        it('should match the default snapshot', () => {
            const { container } = renderHelper(
                {},
                <FillInAddress address={address} shouldShowComplementaryFields={true} />,
                () => jest.fn(),
            );
            expect(container).toMatchSnapshot();
        });

        it('input data should have been changed', () => {
            const onSave = jest.fn();
            const getTestId = (name) => `address.${name}-input-input`;
            const { getByTestId } = renderHelper(
                {},
                <FillInAddress address={address} shouldShowComplementaryFields={true} />,
                onSave,
            );

            const unitElm = getByTestId(getTestId('addressLine2'));
            const buildingTypeElm = getByTestId(getTestId('buildingType'));
            const companyElm = getByTestId(getTestId('company'));
            const cityElm = getByTestId(getTestId('city'));
            const provinceCodeElm = getByTestId(getTestId('provinceCode'));
            const postalCodeElm = getByTestId(getTestId('postalCode'));
            const specialInstructionsElm = getByTestId(getTestId('specialInstructions'));

            expect(unitElm.value).toBe(address.addressLine2);
            expect(buildingTypeElm.value).toBe(address.buildingType);
            expect(companyElm.value).toBe(address.company);
            expect(cityElm.value).toBe(address.city);
            expect(provinceCodeElm.value).toBe(address.provinceCode);
            expect(postalCodeElm.value).toBe(address.postalCode);
            expect(specialInstructionsElm.value).toBe(address.specialInstructions);

            fireEvent.change(unitElm, { target: { value: updatedAddress.addressLine2 } });
            fireEvent.change(buildingTypeElm, { target: { value: updatedAddress.buildingType } });
            fireEvent.change(companyElm, { target: { value: updatedAddress.company } });
            fireEvent.change(cityElm, { target: { value: updatedAddress.city } });
            fireEvent.change(provinceCodeElm, { target: { value: updatedAddress.provinceCode } });
            fireEvent.change(postalCodeElm, { target: { value: updatedAddress.postalCode } });

            userEvent.clear(specialInstructionsElm);
            userEvent.type(specialInstructionsElm, updatedAddress.specialInstructions);

            expect(unitElm.value).toBe(updatedAddress.addressLine2);
            expect(buildingTypeElm.value).toBe(updatedAddress.buildingType);
            expect(companyElm.value).toBe(updatedAddress.company);
            expect(cityElm.value).toBe(updatedAddress.city);
            expect(provinceCodeElm.value).toBe(updatedAddress.provinceCode);
            expect(postalCodeElm.value).toBe(updatedAddress.postalCode);
            expect(specialInstructionsElm.value).toBe(updatedAddress.specialInstructions);
        });

        it("should display error styles when input requirements haven't been met", async () => {
            const getTestLabelId = (name) => `address.${name}-input-label`;

            const { getByTestId } = renderHelper(
                {},
                <FillInAddress
                    address={{
                        addressLine2: '',
                        buildingType: 'house',
                        company: '',
                        city: '',
                        provinceCode: 'ON',
                        country: '',
                        postalCode: '',
                        specialInstructions: '',
                    }}
                    shouldShowComplementaryFields={true}
                />,
                jest.fn,
            );

            expect(getByTestId(getTestLabelId('addressLine2'))).not.toHaveClass('text-red');
            expect(getByTestId(getTestLabelId('buildingType'))).not.toHaveClass('text-red');
            expect(getByTestId(getTestLabelId('company'))).not.toHaveClass('text-red');
            expect(getByTestId(getTestLabelId('city'))).not.toHaveClass('text-red');
            expect(getByTestId(getTestLabelId('postalCode'))).not.toHaveClass('text-red');

            await waitFor(() => fireEvent.click(screen.getByTestId('personalInfo-test-button')));

            expect(getByTestId(getTestLabelId('city'))).toHaveClass('text-red');
            expect(getByTestId(getTestLabelId('postalCode'))).toHaveClass('text-red');
        });

        it('should display error styles when buildingType is office but company is empty', async () => {
            const getTestLabelId = (name) => `address.${name}-input-label`;

            const { getByTestId } = renderHelper(
                {},
                <FillInAddress
                    address={{ ...address, buildingType: 'office' }}
                    shouldShowComplementaryFields={true}
                />,
                jest.fn,
            );

            expect(getByTestId(getTestLabelId('company'))).not.toHaveClass('text-red');

            await waitFor(() => fireEvent.click(screen.getByTestId('personalInfo-test-button')));

            expect(getByTestId(getTestLabelId('company'))).toHaveClass('text-red');
        });

        it('specialInstructions should not have more than 150 characters', () => {
            const getTestId = (name) => `address.${name}-input-input`;

            const testMsg = "I won't be in the document";
            let newSpeciaInstructions = address.specialInstructions;
            const { getByTestId } = renderHelper(
                {},
                <FillInAddress address={address} shouldShowComplementaryFields={true} />,
                jest.fn,
            );

            const specialInstructionsElm = getByTestId(getTestId('specialInstructions'));

            expect(specialInstructionsElm.value).toBe(address.specialInstructions);

            for (let i = 0; i < 14; ++i) {
                newSpeciaInstructions += address.specialInstructions;
            }

            userEvent.type(specialInstructionsElm, newSpeciaInstructions);

            expect(specialInstructionsElm.value).toBe(newSpeciaInstructions);
            newSpeciaInstructions += testMsg;

            userEvent.type(specialInstructionsElm, newSpeciaInstructions);

            expect(screen.queryByText(testMsg)).not.toBeInTheDocument(newSpeciaInstructions);
        });
    });
});

const FormWrapper = ({ children, onSave }) => {
    const methods = useForm({
        resolver: yupResolver(SCHEMA_ADDRESS),
    });
    const { handleSubmit } = methods;

    const onSubmit = (data) => onSave(data);
    return (
        <FormProvider {...methods}>
            <form className="w-64 md:w-72 mb-11" onSubmit={handleSubmit(onSubmit)}>
                {children}
                <button data-testid="personalInfo-test-button">Clicked Me</button>
            </form>
        </FormProvider>
    );
};

const renderHelper = ({ locale = 'en-CA' }, children, onSave) => {
    const messages = {
        ...require(`@colorseven/textarea-counter/locales/${locale}.json`),
        ...require(`../locales/${locale}.json`),
    };

    return render(
        <IntlProvider locale={locale} messages={messages}>
            <FormWrapper onSave={onSave}>{children}</FormWrapper>
        </IntlProvider>,
    );
};
