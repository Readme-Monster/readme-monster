import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { ReactElement } from "react";
import "@testing-library/jest-dom";

import { Routes as AppRoutes } from "../../src/pages/Routes";
import App from "../../src/pages/App";

describe("Routes 테스트", () => {
  test('기본 경로("/")에서 HomePage 컴포넌트가 렌더링되어야 함', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});

describe("App", () => {
  test("App 컴포넌트가 성공적으로 렌더링되어야 함", async () => {
    renderWithRouter(<App />, { route: "/" });
    const linkElement = screen.getByTestId("home");
    expect(await linkElement).toBeInTheDocument();
  });

  function renderWithRouter(Component: ReactElement, options: { route: string }) {
    return render(<MemoryRouter initialEntries={[options.route]}>{Component}</MemoryRouter>);
  }
});
