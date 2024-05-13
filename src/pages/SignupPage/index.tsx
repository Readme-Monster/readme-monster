import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { InputProps } from "../../components/Common/Input/types";
import Input from "../../components/Common/Input";
import { useRouter } from "../routing";
import { app, db } from "../../firebaseApp";

function SignupPage() {
  const [registerError, setRegisterError] = useState<string>("");
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
    const { name, email, password } = credentials;
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "userInfo"), {
        name: name,
        email: email,
        registrationDate: new Date(),
        sections: []
      });
  
      toast.success("회원가입에 성공했습니다.");
      router.push("/");
    } catch (error: any) {
      handleFirebaseError(error);
      console.log(error);
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

  async function handleGoogle(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const auth = getAuth(app);
    const provider = await new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      
      await addDoc(collection(db, "userInfo", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        registrationDate: new Date(),
        sections: []
      });
      
      toast.success("회원가입에 성공했습니다.");
      router.push("/");
      return result.user;
    } catch (error : any) {
      console.error("Error signing in with Google:", error);
      handleFirebaseError(error);
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" data-testid="signup">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl dark:text-textWhite font-bold sm:text-3xl h-1px">회원가입</h1>

        <div className="mb-0 mt-6 space-y-4  p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            onClick={handleGoogle}
            className="block w-full rounded-full bg-white border-1 border-gray-300 px-5 py-2.5 text-sm font-medium cursor-pointer flex items-center"
            data-testid="google-button"
          >
            <img src="/images/google-logo.svg" alt="github" className="h-8 w-8" />
            <span className="flex-grow text-center">Goole로 회원가입</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-300 bg-gray-300 mx-4 mt-5 leading-none h-px">
          <span className="bg-textWhite dark:bg-darkPrimary p-3">또는</span>
        </p>

        <form className="mb-0 mt-6 space-y-4  p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
          <div>
            <Input
              value={credentials.name}
              id="name"
              placeholder="이름을 입력해주세요"
              onChange={handleChange}
              error={errors.name}
            />
          </div>

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

          <div>
            <Input
              value={credentials.passwordCheck}
              id="passwordCheck"
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={handleChange}
              error={errors.passwordCheck}
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-textBlue dark:bg-darkSecondary px-5 py-3 text-sm font-medium text-white cursor-pointer"
            data-testid="signup-button"
            // disabled={Object.keys(errors).length > 0}
          >
            RM으로 회원가입하기
          </button>

          <p className="text-center text-sm text-gray-300">
            이미 회원이신가요?
            <a
              className="underline text-gray-400 cursor-pointer"
              onClick={() => router.push("/login")}
              data-testid="login-url"
            >
              로그인하러가기
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
