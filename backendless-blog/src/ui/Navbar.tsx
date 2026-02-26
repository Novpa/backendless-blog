import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="bg-stone-300 flex justify-between px-10 h-15 items-center
    ">
      <div>
        <NavLink to="/">
          <h1>Loggy</h1>
        </NavLink>
      </div>
      <div className="flex gap-5">
        <NavLink to="feeds">Feeds</NavLink>
        <NavLink to="admin/dashboard">Create Log</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
