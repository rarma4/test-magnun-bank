import LogoMagnum from "../../src/assets/logo-magnum.png";

const Header = () => {
  return (
    <header className="bg-gray-500 text-white px-4 py-4 text-center flex justify-center items-center">
      <img src={LogoMagnum} alt="Logo Magnum" className="w-490 h-151" />
    </header>
  );
};

export default Header;
