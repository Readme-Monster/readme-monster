import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";
import { InputProps } from "../../components/Common/Input/types";
import Input from "../../components/Common/Input";
import { app } from "../../firebaseApp";
import { useRouter } from "../routing";

const LoginPage = () => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: targetId, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [targetId]: value,
    }));

    if (targetId === "email") {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setErrors({ ...errors, email: "이메일 형식이 올바르지 않습니다." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    if (targetId === "password") {
      if (value?.length < 8) {
        setErrors({ ...errors, password: "비밀번호는 8자리 이상으로 입력해주세요" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인에 성공했습니다.");
      router.push("/editor");
    } catch (error: any) {
      handleFirebaseError(error);
    }
  };

  function handleFirebaseError(error: { code: string; message: string }) {
    let message = "";
    switch (error.code) {
    case "auth/invalid-email":
      message = "이메일 주소를 찾을 수 없습니다.";
      break;
    case "auth/user-disabled":
      message = "계정이 비활성화되었습니다. 관리자에게 문의하세요.";
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
      message = "잘못된 이메일이나 비밀번호입니다.";
      break;
    default:
      message = "로그인에 실패했습니다.";
    }
    toast.error(message);
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" data-testid="login">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold sm:text-3xl h-1px">로그인</h1>

        <p className="text-center text-sm text-gray-300 bg-gray-300 mx-4 mt-5 leading-none h-px">
          <span className="bg-white p-3">또는</span>
        </p>

        <form className="mb-0 mt-6 space-y-4  p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
          <div>
            <Input
              value={credentials.email}
              id="email"
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <div>
            <Input
              value={credentials.password}
              id="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-textBlue px-5 py-3 text-sm font-medium text-white cursor-pointer"
            data-testid="login-button"
            // disabled={Object.keys(errors).length > 0}
          >
            로그인
          </button>

          <p className="text-center text-sm text-gray-300">
            회원이 아니신가요?
            <a
              className="underline text-gray-400 cursor-pointer"
              onClick={() => router.push("/signup")}
              data-testid="signup-url"
            >
              회원가입하러가기
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
