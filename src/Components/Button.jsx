import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({
  buttonStyle,
  text,
  icon,
  iconStyle,
  textStyle,
  navigateUrl,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(navigateUrl);
  };

  return (
    <button className={`${buttonStyle}`} onClick={handleClick}>
      {icon && <img src={icon} className={`${iconStyle}`} />}
      <h4 className={`${textStyle}`}>{text}</h4>
    </button>
  );
};

export default Button;
