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
    <section className="px-10 py-10 bg-stone-300">
      <div>
        <p>{children}</p>
        <div>
          <button
            type={type}
            onClick={onContinue}
            className="border cursor-pointer">
            Yes
          </button>
          <button
            type="button"
            onClick={onCloseModal}
            className="border cursor-pointer">
            No
          </button>
        </div>
      </div>
    </section>
  );
}

export default CofirmationModal;
