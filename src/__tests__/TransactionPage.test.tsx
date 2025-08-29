import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";


const mockSetBalance = jest.fn();
jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: 1, name: "Usuário Teste", email: "user@teste.com", token: "t", balance: 10000 },
    setBalance: mockSetBalance,
  }),
}));

const mockGetUser = jest.fn();
const mockCreateTransaction = jest.fn();
const mockUpdateBalance = jest.fn();
jest.mock("../services/api", () => ({
  getUser: (...args: any[]) => mockGetUser(...args),
  createTransaction: (...args: any[]) => mockCreateTransaction(...args),
  updateBalance: (...args: any[]) => mockUpdateBalance(...args),
}));

import TransactionPage from "../pages/TransactionPage";

describe("TransactionPage", () => {
  beforeEach(() => {
    jest.spyOn(global, "setTimeout");
    mockSetBalance.mockReset();
    mockGetUser.mockReset();
    mockCreateTransaction.mockReset();
    mockUpdateBalance.mockReset();
  });

  it("bloqueia transação com senha incorreta e mostra erro", async () => {
    mockGetUser.mockResolvedValue({ id: 1, password: "123456" });

    render(
      <MemoryRouter>
        <TransactionPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/cpf\/cnpj/i), "123.456.789-00");
    await userEvent.type(screen.getByLabelText(/nome do favorecido/i), "Fav 1");
    await userEvent.type(screen.getByLabelText(/chave pix/i), "pix@t.com");
    await userEvent.type(screen.getByLabelText(/valor/i), "100");
    await userEvent.type(screen.getByLabelText(/^data$/i), "2025-01-01");
    await userEvent.type(screen.getByLabelText(/senha de transação/i), "000000");

    await userEvent.click(screen.getByRole("button", { name: /transferir/i }));

    await waitFor(() => expect(screen.getByText(/senha de transação incorreta/i)).toBeInTheDocument());
    expect(mockCreateTransaction).not.toHaveBeenCalled();
    expect(mockUpdateBalance).not.toHaveBeenCalled();
    expect(mockSetBalance).not.toHaveBeenCalled();
  });

  it("realiza transação com senha correta, atualiza saldo e exibe resumo", async () => {
    mockGetUser.mockResolvedValue({ id: 1, password: "123456" });
    mockCreateTransaction.mockResolvedValue({ id: 99, type: "PIX", name: "Fav 1", pixKey: "x", amount: 100, date: "2025-01-01" });
    mockUpdateBalance.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={["/transacao"]}>
        <TransactionPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/cpf\/cnpj/i), "123.456.789-00");
    await userEvent.type(screen.getByLabelText(/nome do favorecido/i), "Fav 1");
    await userEvent.type(screen.getByLabelText(/chave pix/i), "pix@t.com");
    await userEvent.type(screen.getByLabelText(/valor/i), "100");
    await userEvent.type(screen.getByLabelText(/^data$/i), "2025-01-01");
    await userEvent.type(screen.getByLabelText(/senha de transação/i), "123456");

    await userEvent.click(screen.getByRole("button", { name: /transferir/i }));

    await waitFor(() => expect(screen.getByText(/resumo da transação/i)).toBeInTheDocument());
    expect(screen.getByText(/protocolo/i)).toBeInTheDocument();
    await waitFor(() => expect(mockCreateTransaction).toHaveBeenCalled());
    await waitFor(() => expect(mockUpdateBalance).toHaveBeenCalled());
    await waitFor(() => expect(mockSetBalance).toHaveBeenCalled());


    expect(setTimeout).toHaveBeenCalled();
  });
});


