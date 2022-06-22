import PropTypes from 'prop-types';
import { Back } from '@colorseven/icons';
import { NextLink } from '@colorseven/link';
import Section from './Section';
import { useTranslations } from 'use-intl';

const ProfileSection = ({ className = '', children }) => {
    const t = useTranslations('ProfilePage');

    return (
        <Section className={`pt-3 md:pt-10 ${className}`}>
            <div className="inline-block lg:hidden mb-2 pl-4 font-bold text-sm text-teal">
                <NextLink href="/profile/user">
                    <div className="flex items-center">
                        <Back className="mr-2" />
                        {t('back')}
                    </div>
                </NextLink>
            </div>
            {children}
        </Section>
    );
};

ProfileSection.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default ProfileSection;
