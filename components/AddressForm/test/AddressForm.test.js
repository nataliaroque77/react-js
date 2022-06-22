import { render } from '@testing-library/react';
import AddressForm from '../src/AddressForm';

import { IntlProvider } from 'use-intl';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useFormContext: () => ({
        register: jest.fn(),
        formState: {},
        getValues: jest.fn(),
    }),
}));

afterAll(() => {
    jest.clearAllMocks();
});

const address = {
    addressLine1: '50 Dunfield Ave',
    addressLine2: '1210',
    buildingType: 'house',
    company: '',
    city: 'Toronto',
    provinceCode: 'ON',
    postalCode: 'M4S 2H2',
    specialInstructions: '0123456789',
};

describe('<AddressForm />', () => {
    describe.each(['en-CA', 'fr-CA'])('when locale=%p', (locale) => {
        it('should match default snapshot with locale passed', () => {
            const { container } = renderHelper(
                { locale },
                <AddressForm
                    address={address}
                    isGoogleAPILoaded={false}
                    shouldShowComplementaryFields={true}
                    onCancel={() => jest.fn()}
                    onSave={() => jest.fn()}
                />,
            );
            expect(container).toMatchSnapshot();
        });

        it('should match default snapshot when isGoogleAPILoaded is true', () => {
            const { container } = renderHelper(
                { locale },
                <AddressForm
                    address={address}
                    isGoogleAPILoaded={true}
                    shouldShowComplementaryFields={true}
                    onCancel={() => jest.fn()}
                    onSave={() => jest.fn()}
                />,
            );
            expect(container).toMatchSnapshot();
        });
    });
});

const renderHelper = ({ locale = 'en-CA' }, children) => {
    return render(
        <IntlProvider
            locale={locale}
            messages={{
                ...require(`../locales/${locale}.json`),
                ...require(`@colorseven/profile-button-group/locales/${locale}.json`),
                ...require(`@colorseven/textarea-counter/locales/${locale}.json`),
            }}
        >
            {children}
        </IntlProvider>,
    );
};
