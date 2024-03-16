import React from "react";

const Button = ({ buttonStyle, onClick, text, icon, iconStyle, textStyle }) => {
    return (
      <button
        className={`${buttonStyle}`}
        onClick={onClick}
      >
        {icon && <img src={icon} className={`${iconStyle}`} />}
        <h4 className={`${textStyle}`}>{text}</h4>
      </button>
    );
};

export default Button