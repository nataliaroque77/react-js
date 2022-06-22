import { render, fireEvent, waitFor } from '@testing-library/react';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchAddress from '../src/SearchAddress';

import { IntlProvider } from 'use-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { SCHEMA_ADDRESS } from '@colorseven/validations/src/FormSchemaValidation';

const setAutoCompeleted = () => jest.fn();
const initStreet = '33 Holly Street';
const updatedStreet = '50 Dunfield Ave';

describe('<SearchAddress />', () => {
    describe.each(['en-CA', 'fr-CA'])('when locale=%p', (locale) => {
        it('should match default snapshot with locale passed', () => {
            const { container } = render(
                <SearchAddressWrapper locale={locale}>
                    <SearchAddress setAutoCompeleted={setAutoCompeleted} street={initStreet} />
                </SearchAddressWrapper>,
            );
            expect(container).toMatchSnapshot();
        });

        it('Street data should have changed', async () => {
            const { getByTestId } = render(
                <SearchAddressWrapper locale={locale}>
                    <SearchAddress setAutoCompeleted={setAutoCompeleted} street={initStreet} />
                </SearchAddressWrapper>,
            );
            const streetElm = getByTestId('address.addressLine1-input-input');

            expect(streetElm.value).toBe(initStreet);
            await waitFor(() => fireEvent.change(streetElm, { target: { value: updatedStreet } }));
            expect(streetElm.value).toBe(updatedStreet);
        });

        it('Street data should heve changed when an address was selected', async () => {
            const { getByRole, getByTestId } = render(
                <SearchAddressWrapper locale={locale}>
                    <SearchAddress setAutoCompeleted={setAutoCompeleted} street={initStreet} />
                </SearchAddressWrapper>,
            );
            const selectionElm = getByRole('button');
            const streetElm = getByTestId('address.addressLine1-input-input');

            expect(selectionElm).toBeTruthy();
            expect(streetElm.value).toBe(initStreet);
            await waitFor(() => fireEvent.click(selectionElm));
            expect(streetElm.value).toBe(updatedStreet);
        });
    });
});

const SearchAddressWrapper = ({ children, locale = 'en-CA' }) => {
    const methods = useForm({
        resolver: yupResolver(SCHEMA_ADDRESS),
    });
    return (
        <IntlProvider
            locale={locale}
            messages={{
                // eslint-disable-next-line security/detect-non-literal-require
                ...require(`../locales/${locale}.json`),
            }}
        >
            <FormProvider {...methods}>{children}</FormProvider>
        </IntlProvider>
    );
};
