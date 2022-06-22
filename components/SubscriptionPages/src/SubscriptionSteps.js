import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';
import ProgressBar from '@colorseven/progress-bar';

const SubscriptionSteps = ({ steps }) => {
    const t = useTranslations('SubscriptionPages.Steps');
    const { asPath } = useRouter();

    /* 
        below code is for keep step active in progress bar, 
        when user is in delivery or payment and they edit their info 
    */
    const pathArray = asPath.replace(/editaddress|edit/gi, '').split('/');
    if (pathArray[pathArray.length - 1] === '') {
        pathArray.pop();
    }
    const currentStep = pathArray.join('/');

    return (
        steps?.length > 0 && (
            <ProgressBar
                currentStep={currentStep}
                steps={steps}
                translations={{
                    myplan: t('myplan'),
                    account: t('account'),
                    delivery: t('delivery'),
                    payment: t('payment'),
                }}
            />
        )
    );
};

SubscriptionSteps.propTypes = {
    steps: PropTypes.string,
};

export default SubscriptionSteps;
