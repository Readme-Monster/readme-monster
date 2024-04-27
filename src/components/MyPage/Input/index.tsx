import React from "react";
import { InputProps } from "./types";

const Input = ({ value, id, placeholder, onChange }: InputProps) => {
  return (
    <input
      className="w-full h-10 bg-[#CCEEFF] text-center"
      value={value}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
    />
  );
};

export default Input;
