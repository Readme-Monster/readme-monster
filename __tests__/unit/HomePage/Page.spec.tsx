import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";

import HomePage from "../../../src/pages/HomePage";

describe("HomePage 테스트", () => {
  test("HomePage가 정상적으로 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });

  test("올바른 props로 두 개의 버튼이 렌더링되어야 함", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const firstButton = screen.getByTestId("firstButton");
    expect(firstButton).toBeInTheDocument();

    const secondButton = screen.getByTestId("secondButton");
    expect(secondButton).toBeInTheDocument();
  });

  test("버튼 클릭시 올바른 URL로 이동해야 함", () => {
    const pushMock = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouterMock = jest.spyOn(require("../../../src/pages/routing"), "useRouter").mockReturnValue({
      push: pushMock,
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    // 첫 번째 버튼 클릭
    const firstButton = screen.getByTestId("firstButton");
    fireEvent.click(firstButton);
    expect(pushMock).toHaveBeenCalledWith("/editor");

    // 두 번째 버튼 클릭
    const secondButton = screen.getByTestId("secondButton");
    fireEvent.click(secondButton);
    expect(pushMock).toHaveBeenCalledWith("/signup");

    useRouterMock.mockRestore();
  });
});
