import { useNavigation } from "react-router-dom";
import ButtonCta from "../../ui/ButtonCta";
import Loader from "../../ui/Loader";

function Landing() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <Loader />}
      <main className="px-10 sm:px-15 md:px-20 lg:px-30 pt-30">
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl font-semibold py-5">
            <h1 className="py-2 flex">Welcome do Loggy</h1>
            <h2 className="py-2 bg-linear-to-r flex">Pour your Logs</h2>
          </div>

          <div className="w-full lg:w-[50%] font-light sm:font-medium text-stone-400 pb-8">
            <p>
              ≈ The place where people{" "}
              <strong className="text-stone-300">bloggy</strong>, share their{" "}
              <strong className="text-stone-300">loggy</strong>, and
              occasionally embrace the{" "}
              <strong className="text-stone-300">buggy</strong>. A minimalist
              SPA for developers and thinkers who know that code isn't always
              perfect, but stories should be ≈
            </p>
          </div>
          <ButtonCta to="admin/dashboard">Create your first Log</ButtonCta>
        </div>
      </main>
    </>
  );
}

export default Landing;
