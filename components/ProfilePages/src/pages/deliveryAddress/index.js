import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';
import ProfileInfoDisplayTextPair from '../../ProfileInfoDisplayTextPair';

const DeliveryAddress = ({ address }) => {
    const t = useTranslations('ProfilePage.User');

    const notAvailable = t('notAvailable');
    const { address_line_1, address_line_2, city, province_code, postal_code, building_type } =
        address;
    const getFieldValue = (titleType) => (address_line_1 ? address[titleType] : notAvailable);
    const getTypeOfResidence = () =>
        building_type ? t(`Address.BuildingTypes.${building_type}`) : notAvailable;
    const addressValue = address_line_1
        ? `${
              address_line_2 ? address_line_2 + ' - ' : ''
          }${address_line_1}, ${city}, ${province_code}, ${postal_code}`
        : notAvailable;

    return (
        <ProfileSubSection>
            <Heading href="/profile/user/address" isAdd={!address_line_1} isEdit={!!address_line_1}>
                {t('Address.heading')}
            </Heading>
            <div className="pt-5">
                <ProfileInfoDisplayTextPair
                    fieldName={t('Address.Title.address')}
                    value={addressValue}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Address.Title.typeOfResidence')}
                    value={getTypeOfResidence()}
                />
                <ProfileInfoDisplayTextPair
                    fieldName={t('Address.Title.deliveryInstructions')}
                    value={getFieldValue('special_instructions')}
                />
            </div>
        </ProfileSubSection>
    );
};

DeliveryAddress.propTypes = {
    address: PropTypes.shape({
        id: PropTypes.string,
        user_id: PropTypes.string,
        address_line_1: PropTypes.string,
        address_line_2: PropTypes.string,
        company: PropTypes.string,
        city: PropTypes.string,
        province_code: PropTypes.string,
        country_code: PropTypes.string,
        postal_code: PropTypes.string,
        special_instructions: PropTypes.string,
        is_default: PropTypes.bool,
        fsa: PropTypes.string,
        building_type: PropTypes.string,
    }),
};

export default DeliveryAddress;
