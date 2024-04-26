import React from "react";
import { InputProps } from "./types";

const Input = ({ value, onChange }: InputProps) => {
  return (
    <input
      className="w-1/5 h-10 bg-[#CCEEFF] text-center"
      value={value}
      placeholder="아이디"
      id="id"
      onChange={onChange}
    />
  );
};

export default Input;
