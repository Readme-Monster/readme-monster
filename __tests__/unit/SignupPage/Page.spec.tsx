import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";

import SignupPage from "../../../src/pages/SignupPage";

describe("LoginPage 테스트", () => {
  test("LoginPage 정상적으로 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignupPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });
  test("회원가입 버튼 클릭 시 제출 이벤트 발생", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignupPage />
      </MemoryRouter>,
    );

    const userIdInput = screen.getByPlaceholderText("아이디를 입력해주세요");
    const userNameInput = screen.getByPlaceholderText("이름을 입력해주세요");
    const phoneNumberInput = screen.getByPlaceholderText("전화번호를 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const passwordCheckInput = screen.getByPlaceholderText("비밀번호를 다시 입력해주세요");
    const signpButton = await screen.findByTestId("signup-button");

    await act(async () => {
      fireEvent.change(userIdInput, { target: { value: "testuser" } });
      fireEvent.change(userNameInput, { target: { value: "testusername" } });
      fireEvent.change(phoneNumberInput, { target: { value: "testphonenumber" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
      fireEvent.change(passwordCheckInput, { target: { value: "testpassword" } });
    });

    const consoleSpy = jest.spyOn(console, "log");

    await act(async () => {
      fireEvent.click(signpButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith("Form Submitted:", { id: "testuser", name: "testusername", phone: "testphonenumber", password: "testpassword", passwordCheck: "testpassword", });

    consoleSpy.mockRestore();
  });
  test("url클릭 시 '/login'로 이동한다", () => {
    const pushMock = jest.fn();

    const useRouterMock = jest.spyOn(require("../../../src/pages/routing"), "useRouter").mockReturnValue({
      push: pushMock,
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignupPage />
      </MemoryRouter>,
    );

    const LoginUrl = screen.getByTestId("login-url");
    fireEvent.click(LoginUrl);
    expect(pushMock).toHaveBeenCalledWith("/login");

    useRouterMock.mockRestore();
  });
});
