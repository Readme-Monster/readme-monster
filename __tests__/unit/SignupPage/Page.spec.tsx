import { fireEvent, render, screen } from "@testing-library/react";
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
});
