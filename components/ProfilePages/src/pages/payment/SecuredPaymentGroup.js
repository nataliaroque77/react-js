import { useState } from 'react';
import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';
import { SecuredPayments } from '@colorseven/tooltip';
import { AMexCard, VisaCard, MasterCard, InfoCircle } from '@colorseven/icons';

const SecuredPaymentGroup = () => {
    const t = useTranslations('ProfilePage.Payment');
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        <div className="mt-2.5 mb-7 space-y-2.5" data-testid="profile-secured-payment-group">
            <Text className="text-xs mt-5">{t('securedPayments')}</Text>
            <div className="flex space-x-5 items-center">
                <VisaCard />
                <MasterCard />
                <AMexCard />
                <SecuredPayments
                    opened={isTooltipOpen}
                    target={
                        <div
                            data-testid="profile-secured-payment-group-target"
                            onBlur={() => setIsTooltipOpen(false)}
                            onFocus={() => setIsTooltipOpen(true)}
                            onMouseEnter={() => setIsTooltipOpen(true)}
                            onMouseLeave={() => setIsTooltipOpen(false)}
                            onMouseOver={() => setIsTooltipOpen(true)}
                        >
                            <InfoCircle />
                        </div>
                    }
                    text={t('securedPaymentTooltip')}
                    onClose={() => setIsTooltipOpen(false)}
                />
            </div>
        </div>
    );
};

export default SecuredPaymentGroup;
