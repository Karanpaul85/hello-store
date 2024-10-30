import PropTypes from "prop-types";

const Button = ({
  type = "button",
  title = "button",
  ariaLabel = "button",
  onClick = () => {},
  children,
  classes,
  id,
  disabled = false,
  data = "",
}) => {
  return (
    <button
      type={type}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
      id={id}
      disabled={disabled}
      data-id={data}
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

export default Button;
