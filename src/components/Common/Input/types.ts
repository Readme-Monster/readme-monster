import { ChangeEvent } from "react";

export interface InputProps {
  value: string | number;
  id: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const labels: { [key: string]: string } = {
  id: "아이디",
  name: "이름",
  email: "이메일",
  phone: "전화번호",
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
};
