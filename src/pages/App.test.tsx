import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
