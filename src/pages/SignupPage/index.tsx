import React, { useState, ChangeEvent, FormEvent } from "react";
import { InputProps } from "../../components/Common/Input/types";
import Input from "../../components/Common/Input";
import { useRouter } from "../routing";

function SignupPage() {
  const [credentials, setCredentials] = useState({
    id: "",
    name: "",
    phone: "",
    password: "",
    passwordCheck: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", credentials);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" data-testid="signup">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold sm:text-3xl h-1px">회원가입</h1>

        <p className="text-center text-sm text-gray-300 bg-gray-300 mx-4 mt-5 leading-none h-px">
          <span className="bg-white p-3">또는</span>
        </p>

        <form className="mb-0 mt-6 space-y-4  p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
          <div>
            <Input value={credentials.id} id="id" placeholder="아이디를 입력해주세요" onChange={handleChange} />
          </div>

          <div>
            <Input value={credentials.name} id="name" placeholder="이름을 입력해주세요" onChange={handleChange} />
          </div>

          <div>
            <Input value={credentials.phone} id="phone" placeholder="전화번호를 입력해주세요" onChange={handleChange} />
          </div>

          <div>
            <Input
              value={credentials.password}
              id="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
          </div>

          <div>
            <Input
              value={credentials.passwordCheck}
              id="passwordCheck"
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-textBlue px-5 py-3 text-sm font-medium text-white"
            data-testid="signup-button"
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
