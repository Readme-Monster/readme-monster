import { ChangeEvent } from "react";

export interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
