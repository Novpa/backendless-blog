import ButtonCta from "../../ui/ButtonCta";

function Landing() {
  return (
    <main className="px-30 pt-30">
      <div>
        <div className="text-6xl  font-semibold py-5">
          <h1 className="py-2 flex bg-linear-to-r from-white to-black bg-clip-text  text-transparent">
            Welcome do Loggy
          </h1>
          <h2 className="py-2 bg-linear-to-r flex from-white to-black bg-clip-text  text-transparent">
            Pour your Logs
          </h2>
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
