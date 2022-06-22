import { useTranslations } from 'use-intl';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Title from '@colorseven/title';
import Text from '@colorseven/text';

export const HeroBannerContent = () => {
    const t = useTranslations('SubscriptionPages.HeroBanner');
    return (
        <>
            <Title
                className="font-bold text-3xl md:text-5xl lg:text-6xl leading-tight"
                css={css`
                    line-height: 1 !important;
                `}
                size={1}
            >
                {t('heading')}
            </Title>
            <Text className="text-lg font-bold mt-4">{t('subheading')}</Text>
            <Text className="text-lg leading-snug">{t('description')}</Text>
        </>
    );
};

const SubscriptionHeroBanner = () => {
    return (
        <section className="full-width-container md:h-96">
            <div
                className="relative h-64 md:h-96 bg-cover bg-no-repeat"
                css={css`
                    background-image: url('/images/upsell/heroUpsell.png');
                    background-position: center center;
                    background-attachment: fixed;
                `}
            >
                <div className="relative invisible md:visible md:w-9/12 lg:w-8/12 md:h-64 md:top-8 lg:top-7 bg-white opacity-90 rounded-r-lg rounded-br-lg">
                    <div className="md:w-11/12 lg:w-10/12 relative md:top-6 lg:top-9 md:pl-12 md:pr-0 lg:pl-14 lg:pr-20 lg:ml-auto">
                        <HeroBannerContent />
                    </div>
                </div>
            </div>
            <div className="w-full relative p-5 visible md:invisible">
                <HeroBannerContent />
            </div>
        </section>
    );
};

export default SubscriptionHeroBanner;
