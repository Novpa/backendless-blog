import { NavLink } from "react-router-dom";
import { BsCrop } from "react-icons/bs";

function Navbar() {
  return (
    <nav
      className="fixed border-b border-stone-800 w-full top-0 left-0 flex justify-between px-10 h-17 items-center
    ">
      <div>
        <NavLink to="/">
          <div className="flex gap-2 items-center">
            <BsCrop />
            <h1 className="text-xl font-bold">Loggy</h1>
          </div>
        </NavLink>
      </div>
      <div className="flex gap-5 text-normal">
        <NavLink to="feeds">Feeds</NavLink>
        <NavLink to="admin/dashboard">Create Log</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
