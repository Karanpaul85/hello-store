import PropTypes from "prop-types";

const Button = ({ type, title, ariaLabel, onClick, children, classes }) => {
  return (
    <button
      type={type}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  type: "button",
  title: "button",
  ariaLabel: "button",
  onClick: () => {},
};

export default Button;
