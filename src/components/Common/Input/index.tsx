import React from "react";
import RequiredDot from "../RequiredDot";
import { InputProps, labels } from "./types";

const Input = ({ value, id, placeholder, onChange, error, required }: InputProps) => {
  const label = labels[id] || id;

  const typeCheck = (id: string) => (id === "password" || id === "passwordCheck" ? "password" : "text");

  return (
    <div>
      <div className="flex flex-row gap-[5px]">
        <label htmlFor={label} className="block text font-medium text-textPrimary mb-[5px] dark:text-textWhite">
          {label}
        </label>
        {required && <RequiredDot />}
      </div>
      <input
        className="
          w-full min-h-[50px] 
          rounded-lg border-1 border-gray-200 px-3 text-sm 
          focus:outline-none focus:ring-2 focus:ring-textBlue
          placeholder-[#ADB5BD] placeholder:text-[14px]
          "
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        type={typeCheck(id)}
      />
      <div className="form__block">{error && <span className="text-red-400 text-sm">{error}</span>}</div>
    </div>
  );
};

export default Input;
