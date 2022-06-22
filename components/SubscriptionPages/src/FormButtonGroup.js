import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

import Button, { VARIANTS } from '@colorseven/button';

export default function FormButtonGroup({ onCancel }) {
    const testidBase = 'form-button-group';
    const t = useTranslations('SubscriptionPages.Label');
    return (
        <div className="flex my-3">
            <Button
                className="flex-1 md:w-full mr-2"
                data-testid={`${testidBase}-cta`}
                type="submit"
            >
                {t('update')}
            </Button>
            <Button
                className="flex-1 md:w-full"
                data-testid={`${testidBase}-cta-cancel`}
                variant={VARIANTS.SECONDARY}
                onClick={onCancel}
            >
                {t('cancel')}
            </Button>
        </div>
    );
}

FormButtonGroup.propTypes = {
    onCancel: PropTypes.func,
};
