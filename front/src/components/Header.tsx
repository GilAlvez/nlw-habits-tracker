import Logo from "../assets/logo.svg";
import { Plus } from "phosphor-react";

const Header = () => {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={Logo} />
      <button className="border border-violet-500/60 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 bg-violet-500/5 hover:bg-violet-500/20 hover:border-violet-500/100">
        <Plus className="text-2xl text-violet-500" />
        Novo Hábito
      </button>
    </header>
  );
};

export default Header;
