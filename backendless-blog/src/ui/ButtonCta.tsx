import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ButtonCtaProps {
  to: string;
  children: React.ReactNode;
}

function ButtonCta({ to, children }: ButtonCtaProps) {
  return (
    <Link
      className="text-indigo-400 w-50 flex items-center gap-3 hover:text-white transition-all duration-300"
      to={to}>
      <p>{children}</p>
      <span>
        <FaArrowRightLong />
      </span>
    </Link>
  );
}

export default ButtonCta;
