import Text from '@colorseven/text';
import { useTranslations } from 'use-intl';
import { Schedule } from '@colorseven/icons';

const SkipPlan = () => {
    const t = useTranslations('SubscriptionPages.Label');
    return (
        <div className="flex bg-gray-100 mt-4 rounded-md p-2">
            <Schedule className="inline-block w-6" />
            <Text className="font-normal text-md ml-1">{t('skipPlan')}</Text>
        </div>
    );
};

export default SkipPlan;
