import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";

import LoginPage from "../../../src/pages/LoginPage";

describe("LoginPage 테스트", () => {
  test("LoginPage 정상적으로 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
  test("로그인 버튼 클릭 시 제출 이벤트 발생", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByPlaceholderText("아이디를 입력해주세요");
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    const loginButton = await screen.findByTestId("login-button");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    });

    console.log("Current State:", {
      username: usernameInput.value,
      password: passwordInput.value,
    });

    const consoleSpy = jest.spyOn(console, "log");

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith("Form Submitted:", { username: "testuser", password: "testpassword" });

    consoleSpy.mockRestore();
  });
});
