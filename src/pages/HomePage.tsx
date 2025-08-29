import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useAuth } from "../contexts/AuthContext";
import { formatCurrency } from "../utils/currency";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      <div className="flex flex-col items-center justify-center py-16 min-h-screen flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user?.name}</h1>
          <p className="mb-4">Saldo atual: <span className="font-semibold text-green-600">{formatCurrency(Number(user?.balance ?? 0))}</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
