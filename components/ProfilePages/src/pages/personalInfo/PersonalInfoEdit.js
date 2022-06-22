import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import Heading from '../../ProfileSubSectionHeading';
import ProfileSubSection from '../../ProfileSubSection';
import PersonalInfoForm from '@colorseven/personal-info-form';
import ProfileButtonGroup from '@colorseven/profile-button-group';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SCHEMA_PERSONAL_INFO } from '@colorseven/validations/src/FormSchemaValidation';

const PersonalInfoEdit = ({ userDetails, onSave, onCancel, hasServerError }) => {
    const t = useTranslations('ProfilePage.User.UserDetails');

    const methods = useForm({
        defaultValues: userDetails,
        resolver: yupResolver(SCHEMA_PERSONAL_INFO),
        criteriaMode: 'all',
    });

    const { handleSubmit } = methods;

    return (
        <div className="pb-5">
            <ProfileSubSection>
                <Heading isAdd={false} isEdit={false}>
                    {t('heading')}
                </Heading>
                <form className="w-64 md:w-72 mb-11" onSubmit={handleSubmit(onSave)}>
                    <PersonalInfoForm
                        hasServerError={hasServerError}
                        methods={methods}
                        value={userDetails}
                        onCancel={onCancel}
                        onSave={onSave}
                    />
                    <ProfileButtonGroup onCancel={onCancel} />
                </form>
            </ProfileSubSection>
        </div>
    );
};

PersonalInfoEdit.propTypes = {
    userDetails: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    hasServerError: PropTypes.bool.isRequired,
};

export default PersonalInfoEdit;
