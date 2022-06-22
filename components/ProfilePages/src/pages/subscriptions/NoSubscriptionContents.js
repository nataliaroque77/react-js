import { useTranslations } from 'use-intl';

import Text from '@colorseven/text';
import Button from '@colorseven/button';
import { NextLink } from '@colorseven/link';
import { ColorsevenWowLogo } from '@colorseven/icons';

import Heading from '../../ProfileSubSectionHeading';

export const MealkitNoSubscription = () => {
    const t = useTranslations('ProfilePage.Subscriptions.Mealkit.noSubscription');
    return (
        <div className="mb-11" data-testid="meal-kit-no-subscription">
            <Heading isAdd={false} isEdit={false}>
                {t('title')}
            </Heading>
            <Text className="w-80 pt-2 pb-5 text-sm"> {t('description')}</Text>
            <NextLink href="/subscriptions/my-plan">
                <Button className="text-base" data-testid="meal-kit-no-plan-button">
                    {t('label')}
                </Button>
            </NextLink>
        </div>
    );
};

export const WowNoSubscription = () => {
    const t = useTranslations('ProfilePage.Subscriptions.Wow.noSubscription');
    return (
        <section
            className="w-full -mt-7 pt-7 pl-4 lg:pl-12 pb-6 bg-teal-200 border border-gray-300 last:border-0 border-t-hidden border-l-hidden border-r-hidden"
            data-testid="wow-no-subscription"
        >
            <div className="h-5 w-16 flex flex-col items-stretch">
                <ColorsevenWowLogo className="w-full" />
            </div>
            <Text className="pt-2.5 pb-5 font-bold text-sm"> {t('description')}</Text>
            <NextLink href="/profile/subscriptions/wow">
                <Button className="text-base" data-testid="wow-no-plan-button">
                    {t('label')}
                </Button>
            </NextLink>
        </section>
    );
};
