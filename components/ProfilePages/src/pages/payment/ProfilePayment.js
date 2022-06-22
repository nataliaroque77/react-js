import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';
import SecuredPaymentGroup from './SecuredPaymentGroup';
import ProfileInfoDisplayTextPair from '../../ProfileInfoDisplayTextPair';

const ProfilePayment = ({ payment }) => {
    const [showSecuredPaymentGroup, setShowSecuredPaymentGroup] = useState(false);

    const t = useTranslations('ProfilePage.Payment');
    const paymentExists = Object.keys(payment).length !== 0;
    const { name, last4, billing_address } = payment;

    let addressLine1, addressLine2, city, addressState, addressZip;

    if (billing_address) {
        addressLine1 = billing_address.address_line1;
        addressLine2 = billing_address.address_line2;
        city = billing_address.address_city;
        addressState = billing_address.address_state;
        addressZip = billing_address.address_zip;
    }

    useEffect(() => {
        // This is used to detect if component has been mounted and show the tooltip only after that,
        // otherwise tooltip won't show up, when tooltip is rendered on server
        setShowSecuredPaymentGroup(true);
    }, []);

    return (
        <ProfileSubSection>
            <Heading href="/profile/payment/edit" isAdd={!paymentExists} isEdit={paymentExists}>
                {t('Information.heading')}
            </Heading>
            {showSecuredPaymentGroup && <SecuredPaymentGroup />}

            {paymentExists && (
                <>
                    <ProfileInfoDisplayTextPair fieldName={t('nameOnCard')} value={name} />
                    <ProfileInfoDisplayTextPair
                        fieldName={t('currentCreditCard')}
                        value={`**** **** **** ${last4}`}
                    />
                    <ProfileInfoDisplayTextPair
                        fieldName={t('billingAddress')}
                        value={`${
                            addressLine2 ? addressLine2 + ' - ' : ''
                        } ${addressLine1}, ${city}, ${addressState}, ${addressZip}`}
                    />
                </>
            )}
        </ProfileSubSection>
    );
};

ProfilePayment.propTypes = {
    payment: PropTypes.object,
};

export default ProfilePayment;
