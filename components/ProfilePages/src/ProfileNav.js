import PropTypes from 'prop-types';
import { NextLink, VARIANTS } from '@colorseven/link';
import { User, Payment, Expose, Gift, Chevron } from '@colorseven/icons';
import { useTranslations } from 'use-intl';

const ProfileNav = ({ currentHref, className }) => {
    const t = useTranslations('ProfilePage.Menu');

    return (
        <nav className={className}>
            <ProfileItem
                Icon={User}
                currentHref={currentHref}
                href={'/profile/user'}
                testId="profile-nav__profile"
                text={t('profile')}
            />
            <ProfileItem
                Icon={Payment}
                currentHref={currentHref}
                href={'/profile/payment'}
                testId="profile-nav__payment"
                text={t('payment')}
            />
            <ProfileItem
                Icon={Expose}
                currentHref={currentHref}
                href={'/profile/subscriptions'}
                testId="profile-nav__subscriptions"
                text={t('subscriptions')}
            />
            <ProfileItem
                Icon={Gift}
                currentHref={currentHref}
                href={'/profile/share'}
                testId="profile-nav__share"
                text={t('share')}
            />
        </nav>
    );
};

const ProfileItem = ({ testId, text, href, Icon, currentHref = '' }) => {
    const linkType =
        currentHref.startsWith(href) || (currentHref === '/profile' && href === '/profile/user')
            ? VARIANTS.SELECTION_SELECTED
            : VARIANTS.SELECTION;

    const testIdSelected = linkType === VARIANTS.SELECTION_SELECTED ? `${testId}-selected` : testId;

    return (
        <NextLink
            className="flex items-center mb-4 last:mb-0 py-7 pl-5 pr-4 font-bold text-base leading-none"
            href={href}
            linkType={linkType}
            name={testIdSelected}
        >
            <Icon className="w-5 h-5 mr-2" />
            <div className="flex-1">{text}</div>
            <Chevron />
        </NextLink>
    );
};

ProfileItem.propTypes = {
    testId: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    Icon: PropTypes.func,
    currentHref: PropTypes.string,
};

ProfileNav.propTypes = {
    currentHref: PropTypes.string,
    className: PropTypes.string,
};

export default ProfileNav;
