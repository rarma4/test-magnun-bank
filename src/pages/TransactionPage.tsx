import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { useAuth } from "../contexts/AuthContext";
import { createTransaction, updateBalance, getUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { formatCurrency, extractNumericValue, validateAmount, handleCurrencyChange } from "../utils/currency";

const TransactionPage = () => {
  const { user, setBalance } = useAuth() as any;
  const navigate = useNavigate();
  const [type, setType] = useState("PIX");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para lidar com mudanças no campo de valor
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrencyChange(e.target.value, setAmount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!user) throw new Error("Usuário não autenticado");

      // Validação de senha
      const freshUser = await getUser(user.id);
      if (!freshUser.password || String(freshUser.password) !== String(password)) {
        setError("Senha de transação incorreta");
        setLoading(false);
        return;
      }

      // Valida o valor da transação
      if (!validateAmount(amount)) {
        setError("Valor inválido para transação");
        setLoading(false);
        return;
      }

      // Extrai o valor numérico do campo formatado
      const numericAmount = extractNumericValue(amount);
      
      const data: any = {
        userId: user?.id,
        type,
        cpfCnpj,
        name,
        bank: type === "TED" ? bank : undefined,
        agency: type === "TED" ? agency : undefined,
        account: type === "TED" ? account : undefined,
        pixKey: type === "PIX" ? pixKey : undefined,
        amount: Number(numericAmount),
        date,
      };
      const result = await createTransaction(data);
      const newBalance = Number(user.balance ?? 0) - Number(numericAmount);
      await updateBalance(user.id, newBalance);
      setBalance(newBalance);
      setSummary(result);
    } catch (err) {
      setError("Erro ao criar transação");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (summary) {
      const timer = setTimeout(() => navigate("/historico"), 2000);
      return () => clearTimeout(timer);
    }
  }, [summary, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      <div className="flex flex-col items-center justify-center py-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Nova Transação</h2>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-1">Tipo</label>
            <select id="type" value={type} onChange={e => setType(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="PIX">PIX</option>
              <option value="TED">TED</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="cpfCnpj" className="block mb-1">CPF/CNPJ</label>
            <input id="cpfCnpj" type="text" className="w-full border rounded px-3 py-2" value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="favorecido" className="block mb-1">Nome do favorecido</label>
            <input id="favorecido" type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          {type === "TED" && (
            <>
              <div className="mb-4">
                <label htmlFor="bank" className="block mb-1">Banco</label>
                <input id="bank" type="text" className="w-full border rounded px-3 py-2" value={bank} onChange={e => setBank(e.target.value)} required={type === "TED"} />
              </div>
              <div className="mb-4">
                <label htmlFor="agency" className="block mb-1">Agência</label>
                <input id="agency" type="text" className="w-full border rounded px-3 py-2" value={agency} onChange={e => setAgency(e.target.value)} required={type === "TED"} />
              </div>
              <div className="mb-4">
                <label htmlFor="account" className="block mb-1">Conta</label>
                <input id="account" type="text" className="w-full border rounded px-3 py-2" value={account} onChange={e => setAccount(e.target.value)} required={type === "TED"} />
              </div>
            </>
          )}
          {type === "PIX" && (
            <div className="mb-4">
              <label htmlFor="pixKey" className="block mb-1">Chave PIX</label>
              <input id="pixKey" type="text" className="w-full border rounded px-3 py-2" value={pixKey} onChange={e => setPixKey(e.target.value)} required={type === "PIX"} />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-1">Valor</label>
            <input 
              id="amount" 
              type="text" 
              className="w-full border rounded px-3 py-2" 
              value={amount} 
              onChange={handleAmountChange} 
              placeholder="R$ 0,00"
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-1">Data</label>
            <input id="date" type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1">Senha de transação</label>
            <input id="password" type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Enviando..." : "Transferir"}
          </button>
        </form>
        {summary && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-6 w-full max-w-lg">
            <h3 className="font-bold mb-3">Resumo da Transação</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">Tipo</div>
              <div>{summary.type}</div>
              {summary.name && (
                <>
                  <div className="font-semibold">Favorecido</div>
                  <div>{summary.name}</div>
                </>
              )}
              {summary.pixKey && (
                <>
                  <div className="font-semibold">Chave PIX</div>
                  <div>{summary.pixKey}</div>
                </>
              )}
              {summary.bank && (
                <>
                  <div className="font-semibold">Banco</div>
                  <div>{summary.bank}</div>
                  <div className="font-semibold">Agência</div>
                  <div>{summary.agency}</div>
                  <div className="font-semibold">Conta</div>
                  <div>{summary.account}</div>
                </>
              )}
              <div className="font-semibold">Valor</div>
              <div>{formatCurrency(Number(summary.amount))}</div>
              <div className="font-semibold">Data</div>
              <div>{summary.date}</div>
              <div className="font-semibold">Protocolo</div>
              <div>{summary.id}</div>
            </div>
            <div className="text-xs mt-3">Você será redirecionado para o histórico...</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TransactionPage;
