import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import "@testing-library/jest-dom";

import SignupPage from "../../../src/pages/SignupPage";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("SignupPage 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createUserWithEmailAndPassword.mockResolvedValue({ user: { email: "test@example.com", uid: "123456" }});
  });

  test("SignupPage 정상적으로 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <SignupPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });

  test("유효한 정보 입력 시 회원가입 성공", async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <SignupPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
    const nameInput = screen.getByPlaceholderText("이름을 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const passwordCheckInput = screen.getByPlaceholderText("비밀번호를 다시 입력해주세요");
    const signupButton = screen.getByTestId("signup-button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(nameInput, { target: { value: "Test Name" } });
      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.change(passwordCheckInput, { target: { value: "12345678" } });
    });
    const consoleSpy = jest.spyOn(console, "log");
    await act(async () => {
      fireEvent.click(signupButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith("Form Submitted:", { email: "test@example.com", name: "Test Name", password: "12345678", passwordCheck: "12345678", });
    expect(toast.success).toHaveBeenCalledWith("회원가입에 성공했습니다.");
  });

  test("유효성검사 : 비밀번호 재확인", async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const passwordCheckInput = screen.getByPlaceholderText("비밀번호를 다시 입력해주세요");

    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.change(passwordCheckInput, { target: { value: "123456789" } });

    fireEvent.blur(passwordCheckInput);

    await waitFor(() =>
      expect(screen.getByText("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.")).toBeInTheDocument(),
    );
  });

  test("url클릭 시 '/login'로 이동한다", () => {
    const pushMock = jest.fn();

    const useRouterMock = jest.spyOn(require("../../../src/pages/routing"), "useRouter").mockReturnValue({
      push: pushMock,
    });
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    const LoginUrl = screen.getByTestId("login-url");
    fireEvent.click(LoginUrl);
    expect(pushMock).toHaveBeenCalledWith("/login");

    useRouterMock.mockRestore();
  });
});
