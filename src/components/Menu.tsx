import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LogoMagnum from "../../src/assets/logo-magnum.png";
import { FaBars, FaTimes } from 'react-icons/fa';
import { formatCurrency } from "../utils/currency";

const Menu = React.memo(() => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path: string) => {
    if (location.pathname !== path) {
      setIsOpen(false);
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-gray-500 text-white px-4 py-3 flex justify-around items-center relative">
        <Link
          to="/"
          className={`hover:underline ${isActiveLink("/") ? "font-bold text-gray-700" : ""}`}
          onClick={() => handleLinkClick("/")}
        >
          <img src={LogoMagnum} alt="Logo Magnum" className="w-490 h-151" />
        </Link>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`
          md:flex md:flex-row md:items-center md:gap-4
          flex flex-col items-center gap-4
          ${isOpen ? 'absolute top-full left-0 w-full bg-gray-500 z-50 py-4' : 'hidden'}
        `}>
          <div className="flex flex-col md:flex-row md:gap-4 gap-2 text-center">
            <Link
              to="/"
              className={`hover:underline ${isActiveLink("/") ? "font-bold text-gray-700" : ""}`}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>
            <Link
              to="/transacao"
              className={`hover:underline ${isActiveLink("/transacao") ? "font-bold text-gray-700" : ""}`}
              onClick={() => handleLinkClick("/transacao")}
            >
              Transação
            </Link>
            <Link
              to="/historico"
              className={`hover:underline ${isActiveLink("/historico") ? "font-bold text-gray-700" : ""}`}
              onClick={() => handleLinkClick("/historico")}
            >
              Histórico
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            {user && (
              <span className="text-sm bg-blue-800 px-2 py-1 rounded">
                Saldo: {formatCurrency(Number(user.balance ?? 0))}
              </span>
            )}
            <button onClick={() => { logout(); setIsOpen(false); }} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Sair</button>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Menu;