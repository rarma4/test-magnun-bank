import IconMagnum from "../../public/favicon.png";

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white px-4 py-6 text-center flex flex-row justify-around ">
      <p className="text-gray-200 mt-2 flex flex-row gap-2">
        <img src={IconMagnum} alt="Icone Magnum" className="w-10 h-10 mt-1" />
        <span className="text-gray-200 mt-2"> Magnun Bank</span>
      </p>
      <p className="text-gray-200 mt-2">Sistema de Transações</p>
 
    </footer>
  );
};

export default Footer;
