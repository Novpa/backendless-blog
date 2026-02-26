import Button from "./Button";

interface ConfirmationModal {
  type?: "submit" | "reset" | "button";
  onContinue?: () => void;
  onCloseModal: () => void;
  children: React.ReactNode;
}

function CofirmationModal({
  type = "button",
  onContinue,
  onCloseModal,
  children,
}: ConfirmationModal) {
  return (
    <section className="absolute top-0 w-full left-0 h-full flex items-center justify-center bg-white/10 backdrop-blur-xs">
      <div className="px-10 py-10 bg-black rounded-2xl w-[50%] h-50">
        <p className="flex items-center justify-center">{children}</p>
        <div className="flex items-center justify-center gap-5 pt-8">
          <Button type={type} onClick={onContinue} style="primary">
            Yes
          </Button>
          <Button type="button" onClick={onCloseModal} style="secondary">
            No
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CofirmationModal;
