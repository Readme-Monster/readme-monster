import React, { useState } from "react";
import { InputProps } from "./types";

const Input = ({ value, id, placeholder, type, disabled, onChange }: InputProps) => {
  const [isHideClicked, setIsHideClicked] = useState(false);

  const handleHideClick = () => {
    setIsHideClicked(!isHideClicked);
  };
  return (
    <div className="w-full relative">
      <input
        className={`w-full h-10 bg-[#CCEEFF] text-center ${disabled ? "text-gray-400" : ""}`}
        value={value}
        placeholder={placeholder}
        id={id}
        type={type === "password" && !isHideClicked ? "password" : "text"}
        onChange={onChange}
        disabled={disabled}
      />
      {type === "password" && (
        <button className="absolute right-3 top-2.5" onClick={handleHideClick}>
          보기
        </button>
      )}
    </div>
  );
};

export default Input;
