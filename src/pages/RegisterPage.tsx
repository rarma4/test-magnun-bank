import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Erro ao criar conta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
          
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-gray-700">Nome completo</label>
            <input
              id="name"
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-1 text-gray-700">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Já tem uma conta? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Fazer login
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
