import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import ButtonCta from "../../ui/ButtonCta";

function Landing() {
  return (
    <main className="px-30 pt-30">
      <div className="">
        <div className="text-6xl font-semibold py-5">
          <h1 className="py-2">Welcome do Loggy</h1>
          <h2 className="py-2">Pour your Logs</h2>
        </div>

        <div className="w-[50%] text-stone-400 pb-8">
          <p>
            ≈ The place where people{" "}
            <strong className="text-stone-300">bloggy</strong>, share their{" "}
            <strong className="text-stone-300">loggy</strong>, and occasionally
            embrace the <strong className="text-stone-300">buggy</strong>. A
            minimalist SPA for developers and thinkers who know that code isn't
            always perfect, but stories should be ≈
          </p>
        </div>
        <ButtonCta to="admin/dashboard">Create your first Log</ButtonCta>
      </div>
    </main>
  );
}

export default Landing;
