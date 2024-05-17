import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/Common/LoadingSpinner/LoadingSpinner";
import { InputProps } from "../../components/Common/Input/types";
import Input from "../../components/Common/Input";
import { app, db } from "../../firebaseApp";
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
      const hasUpperCase = /[A-Z]/.test(value);
      if (hasUpperCase) {
        setErrors(prev => ({ ...prev, email: "대문자는 입력할 수 없습니다." }));
      } else {
        const validRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;

        if (!value.match(validRegex)) {
          setErrors(prev => ({ ...prev, email: "이메일 형식이 올바르지 않습니다." }));
        } else {
          setErrors(prev => ({ ...prev, email: "" }));
        }
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

  /* eslint-disable */
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

  async function handleGoogle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const auth = getAuth(app);
    const provider = await new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const additionalUserInfo = getAdditionalUserInfo(result);
      console.log(result.user);

      if (additionalUserInfo?.isNewUser) {
        await addDoc(collection(db, "userInfo"), {
          name: result.user.displayName,
          email: result.user.email,
          registrationDate: new Date(),
          sections: [],
        });
      }

      toast.success("로그인에 성공했습니다.");
      router.push("/");
      return result.user;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      handleFirebaseError(error);
      console.log(error);
    }
  }

  return (
    <div className="w-full h-[calc(100vh_-_70px)] flex flex-Center" data-testid="login">
      <div className="w-[480px] p-[24px]">
        <h1 className="text-center text-xl dark:text-textWhite font-bold  mb-[30px]">로그인</h1>
        <form className="mb-0 space-y-4 flex flex-col gap-[5px]" onSubmit={handleSubmit}>
          <Input
            value={credentials.email}
            id="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            value={credentials.password}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-textBlue dark:bg-darkSecondary min-h-[50px] font-medium text-white cursor-pointer"
            data-testid="login-button"
            // disabled={Object.keys(errors).length > 0}
          >
            로그인
          </button>

          <div className="mt-[20px]">
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full rounded-lg bg-white border-1 border-gray-300 px-5 min-h-[50px] text font-medium cursor-pointer flex items-center"
              data-testid="google-button"
            >
              <img src="/images/google-logo.svg" alt="github" className="h-6 w-6" />
              <span className="flex-grow text-center text-textSecondary">Goole로 로그인</span>
            </button>
          </div>
        </form>
        <div className="flex flex-row gap-[10px] w-full mt-[20px] justify-center">
          <p className=" text-gray-300 mb-0">아직 회원이 아니신가요?</p>
          <a
            className="underline text-gray-400 cursor-pointer"
            onClick={() => router.push("/signup")}
            data-testid="signup-url"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
