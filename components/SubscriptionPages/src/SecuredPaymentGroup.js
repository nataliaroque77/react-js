import { useState } from 'react';
import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';
import { SecuredPayments } from '@colorseven/tooltip';
import { AMexCard, VisaCard, MasterCard, InfoCircle } from '@colorseven/icons';

const SecuredPaymentGroup = () => {
    const t = useTranslations('SubscriptionPages.Payment');
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        <div className="mt-2.5 mb-7 space-y-2.5">
            <Text className="text-lg leading-normal tracking-tight">{t('securedPayments')}</Text>
            <div className="flex space-x-5 items-center">
                <VisaCard />
                <MasterCard />
                <AMexCard />
                <SecuredPayments
                    opened={isTooltipOpen}
                    target={
                        <button
                            type="button"
                            onBlur={() => setIsTooltipOpen(false)}
                            onFocus={() => setIsTooltipOpen(true)}
                            onMouseEnter={() => setIsTooltipOpen(true)}
                            onMouseLeave={() => setIsTooltipOpen(false)}
                            onMouseOver={() => setIsTooltipOpen(true)}
                        >
                            <InfoCircle />
                        </button>
                    }
                    text={t('securedPaymentTooltip')}
                    onClose={() => setIsTooltipOpen(false)}
                />
            </div>
        </div>
    );
};

export default SecuredPaymentGroup;
