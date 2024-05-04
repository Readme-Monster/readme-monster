import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
import React from "react";

import LoginPage from "../../../src/pages/LoginPage";

jest.mock("firebase/auth");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("LoginPage 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("LoginPage 정상적으로 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });

  test("유효성검사 : 이메일", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    });

    expect(screen.getByText("이메일 형식이 올바르지 않습니다.")).toBeInTheDocument();
  });

  test("유효성검사 :비밀번호", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "short" } });
    });

    expect(screen.getByText("비밀번호는 8자리 이상으로 입력해주세요")).toBeInTheDocument();
  });

  test("로그인 버튼 클릭 시 제출 이벤트 발생", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const loginButton = await screen.findByTestId("login-button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
      fireEvent.click(loginButton);
    });

    expect(toast.success).toHaveBeenCalledWith("로그인에 성공했습니다.");
  });

  test("잘못된 로그인 정보 제출 시 토스트 에러 메시지", async () => {
    signInWithEmailAndPassword.mockImplementation(() => Promise.reject({ code: "auth/wrong-password" }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const loginButton = screen.getByTestId("login-button");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(loginButton);
    });

    expect(toast.error).toHaveBeenCalledWith("잘못된 이메일이나 비밀번호입니다.");
  });

  test("url클릭 시 '/signup'로 이동한다", () => {
    const pushMock = jest.fn();

    const useRouterMock = jest.spyOn(require("../../../src/pages/routing"), "useRouter").mockReturnValue({
      push: pushMock,
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const SignupUrl = screen.getByTestId("signup-url");
    fireEvent.click(SignupUrl);
    expect(pushMock).toHaveBeenCalledWith("/signup");

    useRouterMock.mockRestore();
  });
});
