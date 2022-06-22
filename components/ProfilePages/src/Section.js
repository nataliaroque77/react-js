import PropTypes from 'prop-types';

const Section = ({ className = '', children }) => {
    return (
        <div className={`border border-gray-300 bg-white rounded-sm ${className}`}>{children}</div>
    );
};

Section.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Section;
