import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { ReactElement } from 'react';
import '@testing-library/jest-dom';

import { Routes as AppRoutes } from '../../src/pages/Routes';
import App from "../../src/pages/App";

describe('Routes 테스트', () => {
  test('기본 경로("/")에서 HomePage 컴포넌트가 렌더링되어야 함', () => {
      render(
          <MemoryRouter initialEntries={['/']}>
              <AppRoutes />
          </MemoryRouter>
      );
      expect(screen.getByText(/HomePage/)).toBeInTheDocument();
  });

  test('잘못된 경로에 접근했을 때 루트 경로("/")로 리다이렉트되어야 함', () => {
      render(
          <MemoryRouter initialEntries={['/some/wrong/path']}>
              <AppRoutes />
          </MemoryRouter>
      );
      expect(screen.getByText(/HomePage/)).toBeInTheDocument();
  });
});
