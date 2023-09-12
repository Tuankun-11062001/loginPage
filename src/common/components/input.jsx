import React from "react";

const Input = ({ title, typeInput, placeholder, func, value, name }) => {
  return (
    <div className="card_input_group">
      <p>{title}</p>
      <input
        placeholder={placeholder}
        type={typeInput}
        onChange={func}
        value={value}
        name={name}
      />
    </div>
  );
};

export default Input;
