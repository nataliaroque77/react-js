import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, VARIANTS } from '@colorseven/button';
import Text from '@colorseven/text';
import { Link } from '@colorseven/link';
import { useTranslations } from 'use-intl';

import ProfilePageTitle from './ProfilePageTitle';
import ProfileNav from './ProfileNav';
import ProfileSection from './ProfileSection';

const ProfilePage = ({ userDetails = {}, storeCredit = 0, router = {}, children, logOut }) => {
    const t = useTranslations('ProfilePage');
    const { asPath } = router;
    const { first_name, last_name, email } = userDetails;

    const isRoot = asPath === '/profile';

    return (
        <section className="py-5">
            <ProfilePageTitle
                className="mb-4"
                email={email}
                firstName={first_name}
                lastName={last_name}
                storeCredit={storeCredit}
            />
            <div className="flex">
                <div
                    className={clsx({
                        'w-1/3 hidden lg:block': !isRoot,
                    })}
                >
                    <ProfileNav className="mb-5" currentHref={asPath} />
                    <Button
                        className="w-full mb-5 bg-white font-bold"
                        variant={VARIANTS.SECONDARY}
                        onClick={logOut}
                    >
                        {t('logout')}
                    </Button>
                    <article className="bg-white px-4 py-1">
                        <Text className="text-sm">
                            {t.rich('Questions.havingQuestions', {
                                faq: (
                                    <Link className="bg-white text-teal underline" href="/" key={1}>
                                        {t('Questions.visitFAQ')}
                                    </Link>
                                ),
                                chat: (
                                    <Link className="bg-white text-teal underline" href="/" key={2}>
                                        {t('Questions.chat')}
                                    </Link>
                                ),
                            })}
                        </Text>
                    </article>
                </div>
                <ProfileSection
                    className={clsx('flex-1 lg:ml-5', {
                        'hidden lg:block': isRoot,
                    })}
                >
                    {children}
                </ProfileSection>
            </div>
        </section>
    );
};

ProfilePage.propTypes = {
    userDetails: PropTypes.object,
    storeCredit: PropTypes.number,
    router: PropTypes.object,
    children: PropTypes.node,
    logOut: PropTypes.func,
};

export default ProfilePage;
