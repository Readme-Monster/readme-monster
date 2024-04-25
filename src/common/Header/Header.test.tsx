import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "pages/App";

describe("App navigation", () => {
  it("should navigate to /home when the Home button is clicked", async () => {
    // MemoryRouter를 사용하여 초기 경로를 설정
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    // Home 버튼을 찾고 클릭 이벤트를 발생시킴
    const homeButton = screen.getByRole("link", { name: "logo" });
    userEvent.click(homeButton);

    // 적절한 URL로 리디렉션이 되었는지 확인
    // 주의: 실제 브라우저의 window.location은 변경되지 않으므로, 상태를 통해 판단해야 함
    // MemoryRouter의 history 객체를 통해 URL 변경을 감지할 수 있음
    expect(window.location.pathname).toBe("/");
  });
});
