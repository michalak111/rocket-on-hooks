import React from "react";

const Button = ({
  children,
  variant,
  disabled = false,
  onClick = () => {},
  ...props
}) => (
  <button
    className={`button button--${variant} ${
      disabled ? "button--disabled" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
