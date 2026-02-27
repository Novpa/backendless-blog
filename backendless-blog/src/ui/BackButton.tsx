import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function BackButton({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  return (
    <div
      className="text-indigo-400 w-50 flex items-center gap-3 cursor-pointer pb-2 hover:text-white transition-all duration-300"
      onClick={() => navigate(-1)}>
      <span>
        <MdOutlineKeyboardBackspace className="text-2xl" />
      </span>
      <p>{children}</p>
    </div>
  );
}

export default BackButton;
