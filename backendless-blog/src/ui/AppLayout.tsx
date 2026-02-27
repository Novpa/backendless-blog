import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <ToastContainer theme="dark" icon={false} />
      <Outlet />
    </div>
  );
}

export default AppLayout;
