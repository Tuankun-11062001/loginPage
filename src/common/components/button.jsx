import React from "react";

const Button = ({ title, func }) => {
  return (
    <button className="card_button" onClick={func}>
      {title}
    </button>
  );
};

export default Button;
