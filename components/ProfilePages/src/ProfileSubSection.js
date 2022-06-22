import PropTypes from 'prop-types';

const ProfileSubSection = ({ children }) => {
    return (
        <section className="px-4 lg:px-10 mb-6 last:mb-0 border border-gray-300 last:border-0 border-t-hidden border-l-hidden border-r-hidden">
            {children}
        </section>
    );
};

ProfileSubSection.propTypes = {
    children: PropTypes.node,
};

export default ProfileSubSection;
