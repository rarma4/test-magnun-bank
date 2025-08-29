import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: 1, name: "Usuário Teste", email: "user@teste.com", token: "t", balance: 1234.56 },
    logout: jest.fn(),
  }),
}));

import Menu from "../components/Menu";

describe("Menu", () => {
  it("exibe saldo formatado", () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );
    expect(screen.getByText(/saldo: r\$ 1.234,56/i)).toBeInTheDocument();
  });
});


