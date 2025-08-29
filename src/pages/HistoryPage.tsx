import React, { useEffect, useState, useMemo } from "react";
import Menu from "../components/Menu";
import { useAuth } from "../contexts/AuthContext";
import { getTransactions } from "../services/api";
import Footer from "../components/Footer";
import { formatCurrency, extractNumericValue, handleCurrencyChange } from "../utils/currency";

const periodOptions = [
  { label: "7 dias", value: 7 },
  { label: "15 dias", value: 15 },
  { label: "30 dias", value: 30 },
  { label: "90 dias", value: 90 },
];

const HistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filtros
  const [type, setType] = useState("");
  const [period, setPeriod] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [valueStart, setValueStart] = useState("");
  const [valueEnd, setValueEnd] = useState("");

  // Função para lidar com mudanças no campo de valor início
  const handleValueStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrencyChange(e.target.value, setValueStart);
  };

  // Função para lidar com mudanças no campo de valor fim
  const handleValueEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCurrencyChange(e.target.value, setValueEnd);
  };

  // Ordenação
  const [orderBy, setOrderBy] = useState("date");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getTransactions(user.id)
      .then(setTransactions)
      .catch(() => setError("Erro ao buscar transações"))
      .finally(() => setLoading(false));
  }, [user]);


  // Filtro e ordenação otimizados
  const filtered = useMemo(() => {
    // Extrai valores numéricos dos campos formatados
    const numericValueStart = valueStart ? Number(extractNumericValue(valueStart)) : 0;
    const numericValueEnd = valueEnd ? Number(extractNumericValue(valueEnd)) : 0;

    let result = transactions.filter((t) => {
      if (type && t.type !== type) return false;
      if (period) {
        const now = new Date();
        const tDate = new Date(t.date);
        const diff = (now.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diff > period) return false;
      }
      if (dateStart && new Date(t.date) < new Date(dateStart)) return false;
      if (dateEnd && new Date(t.date) > new Date(dateEnd)) return false;
      if (valueStart && Number(t.amount) < numericValueStart) return false;
      if (valueEnd && Number(t.amount) > numericValueEnd) return false;
      return true;
    });
    result = result.sort((a, b) => {
      if (orderBy === "date") {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return orderDir === "asc" ? da - db : db - da;
      }
      if (orderBy === "amount") {
        return orderDir === "asc"
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount);
      }
      return 0;
    });
    return result;
  }, [transactions, type, period, dateStart, dateEnd, valueStart, valueEnd, orderBy, orderDir]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      <div className="flex flex-col items-center justify-center py-16 ">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Histórico de Transações</h2>
          {/* Filtros e ordenação */}
          <form className="flex flex-wrap gap-4 mb-6 items-center">
            <select value={type} onChange={e => setType(e.target.value)} className="border rounded px-2 py-1">
              <option value="">Tipo</option>
              <option value="PIX">PIX</option>
              <option value="TED">TED</option>
            </select>
            <select value={period} onChange={e => setPeriod(Number(e.target.value))} className="border rounded px-2 py-1">
              <option value={0}>Período</option>
              {periodOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className="border rounded px-2 py-1" placeholder="Data início" />
            <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="border rounded px-2 py-1" placeholder="Data fim" />
            <input 
              type="text" 
              value={valueStart} 
              onChange={handleValueStartChange} 
              className="border rounded px-2 py-1" 
              placeholder="R$ 0,00"
            />
            <input 
              type="text" 
              value={valueEnd} 
              onChange={handleValueEndChange} 
              className="border rounded px-2 py-1" 
              placeholder="R$ 0,00"
            />
            <label className="ml-4">Ordenar por:</label>
            <select value={orderBy} onChange={e => setOrderBy(e.target.value)} className="border rounded px-2 py-1">
              <option value="date">Data</option>
              <option value="amount">Valor</option>
            </select>
            <button type="button" onClick={() => setOrderDir(orderDir === "asc" ? "desc" : "asc")}
              className="border rounded px-2 py-1 bg-gray-100 hover:bg-gray-200">
              {orderDir === "asc" ? "↑" : "↓"}
            </button>
          </form>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500">Nenhuma transação encontrada.</p>
          ) : (
            <TransactionTable transactions={filtered} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// tabela
const TransactionTable = React.memo(({ transactions }: { transactions: any[] }) => (
  <table className="w-full text-sm mt-4">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 text-left">Tipo</th>
        <th className="p-2 text-left">Favorecido</th>
        <th className="p-2 text-left">Valor</th>
        <th className="p-2 text-left">Data</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((t) => (
        <tr key={t.id} className="border-b">
          <td className="p-2">{t.type}</td>
          <td className="p-2">{t.name}</td>
          <td className="p-2">{formatCurrency(Number(t.amount))}</td>
          <td className="p-2">{t.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

export default HistoryPage;
