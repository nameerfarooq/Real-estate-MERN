import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-1 hover:cursor-pointer">
            <span className="text-slate-500">Nameer</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600 hover:cursor-pointer" />
        </form>
        <ul className="flex gap-4">
          <Link to={"/home"}>
            <li className="text-slate-700 hidden sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="text-slate-700 hidden sm:inline hover:underline">
              About
            </li>
          </Link>
          <Link to={"/sign-in"}>
            <li className="text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
