import PropTypes from 'prop-types';
import Button, { VARIANTS, SIZES } from '@colorseven/button';
import ProfileSubHeading from './ProfileSubHeading';
import { useTranslations } from 'use-intl';
import { NextLink } from '@colorseven/link';

const ProfileSubSectionHeading = ({ children, isEdit, isAdd, href = '/profile' }) => {
    const t = useTranslations('ProfilePage');

    return (
        <div className="flex items-center">
            <ProfileSubHeading className="flex-1 lg:flex-none lg:mr-12">
                {children}
            </ProfileSubHeading>
            {(isEdit || isAdd) && (
                <NextLink href={href}>
                    <Button size={SIZES.SMALL} variant={VARIANTS.SECONDARY}>
                        {t('buttonLabel', { label: isEdit ? 'edit' : 'add' })}
                    </Button>
                </NextLink>
            )}
        </div>
    );
};

ProfileSubSectionHeading.propTypes = {
    children: PropTypes.node,
    isAdd: PropTypes.bool,
    isEdit: PropTypes.bool,
    href: PropTypes.string,
};

export default ProfileSubSectionHeading;
