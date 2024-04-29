import React from "react";
import { InputProps } from "./types";

const Input = ({ value, id, placeholder, onChange }: InputProps) => {
  return (
    <div>
      <input
        className="w-full rounded-lg border-1 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-textBlue"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
