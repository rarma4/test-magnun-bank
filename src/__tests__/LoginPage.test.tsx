import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";


const mockLogin = jest.fn(() => Promise.reject(new Error("Falha no login")));
jest.mock("../contexts/AuthContext", () => {
  const actual = jest.requireActual("../contexts/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      user: null,
      loading: false,
      login: mockLogin,
      logout: jest.fn(),
      register: jest.fn(),
    }),
  };
});

import LoginPage from "../pages/LoginPage";

describe("LoginPage", () => {
  it("renderiza campos de email e senha", () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("exibe erro ao tentar login inválido", async () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    await userEvent.type(screen.getByLabelText(/email/i), "naoexiste@teste.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "errada");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));
    expect(await screen.findByText(/falha no login/i)).toBeInTheDocument();
  });
});