import { ChangeEvent } from "react";

export interface InputProps {
  value: string | number;
  id: string;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
