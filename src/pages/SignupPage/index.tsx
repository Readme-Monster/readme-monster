import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { InputProps } from "../../components/Common/Input/types";
import Input from "../../components/Common/Input";
import { useRouter } from "../routing";
import { app, db } from "../../firebaseApp";

function SignupPage() {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: targetId, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [targetId]: value,
    }));

    if (targetId === "name") {
      const nameRegex = /^[가-힣a-zA-Z]+$/;

      if (!nameRegex.test(value) || value.length < 1) {
        setErrors({ ...errors, name: "올바른 이름을 입력해주세요." });
      } else {
        setErrors({ ...errors, name: "" });
      }
    }

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
      } else if (credentials.passwordCheck?.length > 0 && value !== credentials.passwordCheck) {
        setErrors({ ...errors, password: "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요." });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }

    if (targetId === "passwordCheck") {
      if (value?.length < 8) {
        setErrors({ ...errors, passwordCheck: "비밀번호는 8자리 이상으로 입력해주세요" });
      } else if (value !== credentials.password) {
        setErrors({ ...errors, passwordCheck: "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요." });
      } else {
        setErrors({ ...errors, passwordCheck: "" });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, passwordCheck } = credentials;

    // 유효성 검사
    if (errors.name || errors.email || errors.password || errors.passwordCheck) {
      toast.error("입력하신 정보에 오류가 있습니다. 확인해주세요.");
      return;
    }

    if (!name || !email || !password || !passwordCheck) {
      toast.error("모든 필드를 채워주세요.");
      return;
    }

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "userInfo"), {
        name: name,
        email: email,
        registrationDate: new Date(),
        sections: [],
      });

      toast.success("회원가입에 성공했습니다.");
      router.push("/");
    } catch (error: any) {
      handleFirebaseError(error);
      console.log(error);
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
      case "auth/email-already-in-use":
        message = "이미 사용중인 이메일입니다.";
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
      console.log(result.user);

      await addDoc(collection(db, "userInfo"), {
        name: result.user.displayName,
        email: result.user.email,
        registrationDate: new Date(),
        sections: [],
      });

      toast.success("회원가입에 성공했습니다.");
      router.push("/");
      return result.user;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      handleFirebaseError(error);
    }
  }

  return (
    <div className="w-full h-[calc(100vh_-_70px)] flex flex-Center" data-testid="signup">
      <div className="w-[480px] p-[24px]">
        <h1 className="text-center text-xl dark:text-textWhite font-bold  mb-[30px]">회원가입</h1>
        <form className="mb-0 space-y-4 flex flex-col gap-[3px]" onSubmit={handleSubmit}>
          <Input
            value={credentials.name}
            id="name"
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
            error={errors.name}
            required={true}
          />

          <Input
            value={credentials.email}
            id="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
            error={errors.email}
            required={true}
          />

          <Input
            value={credentials.password}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
            error={errors.password}
            required={true}
          />
          <Input
            value={credentials.passwordCheck}
            id="passwordCheck"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handleChange}
            error={errors.passwordCheck}
            required={true}
          />
          <button
            type="submit"
            className="block w-full rounded-lg min-h-[50px] text font-medium text-white cursor-pointer bg-textBlue dark:bg-darkSecondary"
            data-testid="signup-button"
          >
            가입하기
          </button>

          <div className="mt-[20px]">
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full rounded-lg bg-white border-1 border-gray-300 px-5 min-h-[50px] text font-medium cursor-pointer flex items-center"
              data-testid="google-button"
            >
              <img src="/images/google-logo.svg" alt="github" className="h-6 w-6" />
              <span className="flex-grow text-center text-textSecondary">Goole로 회원가입</span>
            </button>
          </div>
        </form>
        <div className="flex flex-row gap-[10px] w-full mt-[20px] justify-center">
          <p className=" text-gray-300 mb-0">이미 회원이신가요?</p>
          <a
            className="underline text-gray-400 cursor-pointer"
            onClick={() => router.push("/login")}
            data-testid="login-url"
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
