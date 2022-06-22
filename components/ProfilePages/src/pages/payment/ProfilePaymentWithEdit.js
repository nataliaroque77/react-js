import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';

import PaymentEdit from './PaymentEdit';
import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';
import SecuredPaymentGroup from './SecuredPaymentGroup';

const ProfilePayment = ({
    isGoogleAPILoaded,
    locale,
    payment,
    hasServerError,
    onSave,
    onCancel,
}) => {
    const [showSecuredPaymentGroup, setShowSecuredPaymentGroup] = useState(false);

    const t = useTranslations('ProfilePage.Payment');

    useEffect(() => {
        // This is used to detect if component has been mounted and show the tooltip only after that,
        // otherwise tooltip won't show up, when tooltip is rendered on server
        if (payment) {
            setShowSecuredPaymentGroup(true);
        }
    }, [payment]);

    return (
        <ProfileSubSection>
            <Heading href="/profile/payment" isAdd={false} isEdit={false}>
                {t('Information.heading')}
            </Heading>

            {showSecuredPaymentGroup && <SecuredPaymentGroup />}

            <PaymentEdit
                hasServerError={hasServerError}
                isGoogleAPILoaded={isGoogleAPILoaded}
                locale={locale}
                payment={payment}
                onCancel={onCancel}
                onSave={onSave}
            />
        </ProfileSubSection>
    );
};

ProfilePayment.propTypes = {
    isGoogleAPILoaded: PropTypes.bool,
    locale: PropTypes.oneOf(['en-CA', 'fr-CA']),
    payment: PropTypes.object,
    hasServerError: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default ProfilePayment;
