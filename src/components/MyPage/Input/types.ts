import { ChangeEvent } from "react";

export interface InputProps {
  value: string | number;
  id: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
