import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({
  buttonStyle,
  text,
  Icon,
  iconStyle,
  textStyle,
  navigateUrl,
  onClick,
  loading,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (navigateUrl) {
      navigate(navigateUrl);
    }
  };

  return (
    <button
      className={`${buttonStyle}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center gap-3">
          {Icon && <Icon className={`spin`} />}
          <h4 className={`${textStyle}`}>{text}</h4>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          {Icon && <img src={Icon} className={iconStyle} />}
          <h4 className={`${textStyle}`}>{text}</h4>
        </div>
      )}
    </button>
  );
};

export default Button;
