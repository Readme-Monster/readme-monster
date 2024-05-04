import React from "react";
import { InputProps, labels } from "./types";

const Input = ({ value, id, placeholder, onChange, error }: InputProps) => {
  const label = labels[id] || id;

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-500 mb-1"> {label} </label>
      <input
        className="w-full rounded-lg border-1 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-textBlue"
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      />
      <div className="form__block">
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
