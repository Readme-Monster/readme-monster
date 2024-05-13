import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardPage from "../../../src/pages/BoardPage";
import { collection, addDoc, query, onSnapshot, Timestamp, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  onSnapshot: jest.fn(),
  Timestamp: {
    fromDate: jest.fn((date) => ({ seconds: Math.floor(date.getTime() / 1000) })),
  },
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock("../../../src/pages/routing", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const mockComments = [
  { comment: "First comment", registrationDate: { seconds: 1620000000 } },
  { comment: "Second comment", registrationDate: { seconds: 1620003600 } },
];

describe("BoardPage", () => {
  beforeEach(() => {
    getFirestore.mockReturnValue({});
    collection.mockReturnValue({});
    query.mockReturnValue({});
    onSnapshot.mockImplementation((q, success) => {
      success({
        forEach: (callback) => {
          mockComments.forEach((comment) => callback({ data: () => comment }));
        },
      });
      return jest.fn();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Firestore에서 댓글을 렌더링합니다.", async () => {
    render(<BoardPage />);

    expect(screen.getByText("자유게시판")).toBeInTheDocument();

    await waitFor(() => {
      mockComments.forEach((comment) => {
        expect(screen.getByText(comment.comment)).toBeInTheDocument();
        expect(screen.getByText(new Date(comment.registrationDate.seconds * 1000).toLocaleString())).toBeInTheDocument();
      });
    });
  });

  test("새 댓글을 추가합니다.", async () => {
    render(<BoardPage />);

    const input = screen.getByPlaceholderText("글을 입력해주세요");
    const button = screen.getByText("등록");

    fireEvent.change(input, { target: { value: "New comment" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
        registrationDate: expect.any(Object),
        comment: "New comment",
      });
      expect(toast.success).toHaveBeenCalledWith("댓글이 등록되었습니다");
    });
  });

  test("입력 필드가 비어 있을 때 경고를 표시합니다.", async () => {
    render(<BoardPage />);

    const button = screen.getByText("등록");

    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("댓글을 입력해주세요.");
    });
  });
  
});
