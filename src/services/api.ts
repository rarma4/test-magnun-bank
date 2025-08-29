const API_URL = "http://localhost:3001";
// const isLocalhost = window.location.hostname === 'localhost';

// const API_URL = isLocalhost
//   ? 'http://localhost:3001'
//   : 'https://test-magnun-bank.vercel.app/';
  // const API_URL = import.meta.env.VITE_API_URL;
export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const users = await res.json();
  if (users.length === 1) {
    //  JWT
    return {
      ...users[0],
      id: users[0].id, // Manter o ID original (pode ser string)
      token: btoa(`${users[0].id}:${users[0].email}`),
    };
  }
  throw new Error("Usuário ou senha inválidos");
}

export async function getBalance(userId: string | number) {
  const res = await fetch(`${API_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Erro ao buscar saldo");
  const user = await res.json();
  return user.balance;
}

export async function getTransactions(userId: string | number) {
  const res = await fetch(`${API_URL}/transactions?userId=${userId}&_sort=date&_order=desc`);
  if (!res.ok) throw new Error("Erro ao buscar transações");
  return res.json();
}

export async function createTransaction(data: any) {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar transação");
  return res.json();
}

export async function updateBalance(userId: string | number, newBalance: number) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ balance: newBalance }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar saldo");
  return res.json();
}

export async function getUser(userId: string | number) {
  const res = await fetch(`${API_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  const user = await res.json();
  return {
    ...user,
    id: user.id, // Manter o ID original
  };
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      balance: 10000, // Saldo inicial
    }),
  });
  if (!res.ok) throw new Error("Erro ao criar usuário");
  const user = await res.json();
  return {
    ...user,
    id: user.id, // Manter o ID original
    token: btoa(`${user.id}:${user.email}`),
  };
}
