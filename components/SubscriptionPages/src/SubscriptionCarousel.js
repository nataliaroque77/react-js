import PropTypes from 'prop-types';
import { Carousel } from '@colorseven/sliders';
import Title from '@colorseven/title';
import { useTranslations } from 'use-intl';
import RecipeCard from '@colorseven/recipe-card';

const SubscriptionCarousel = ({ recipes }) => {
    const t = useTranslations('SubscriptionPages.Carousel.recipes');
    const args = {
        title: 'subscription',
        scrollStep: 1,
        linkText: 'View all',
        linkHref: '#',
        numberOfSlidesClassName: 'slides-5'
    };

    return (
        <div className="mt-10">
            <Title className="text-2xl font-bold text-center" size={3}>
                {t('heading')}
            </Title>
            <Title className="text-xl text-center text-gray-700" size={4}>
                {t('subheading')}
            </Title>
            <Carousel {...args}>
                {recipes.map((recipe) => (
                    <RecipeCard layout="fixed" {...recipe} key={`${recipe.slug}`} />
                ))}
            </Carousel>
        </div>
    );
};

SubscriptionCarousel.propTypes = {
    recipes: PropTypes.object,
};

export default SubscriptionCarousel;
