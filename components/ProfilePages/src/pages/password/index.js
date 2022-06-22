import { useTranslations } from 'use-intl';

import ProfileSubSection from '../../ProfileSubSection';
import Heading from '../../ProfileSubSectionHeading';

const Password = () => {
    const t = useTranslations('ProfilePage.User.Password');

    return (
        <ProfileSubSection>
            <Heading href="/profile/user/password" isAdd={false} isEdit={true}>
                {t('heading')}
            </Heading>
            <div className="pt-5" />
        </ProfileSubSection>
    );
};

export default Password;
