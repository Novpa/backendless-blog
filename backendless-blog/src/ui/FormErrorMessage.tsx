import type { PropsWithChildren } from "react";

function FormErrorMessage({ children }: PropsWithChildren) {
  return <p className="text-xs text-red-800">{children}</p>;
}

export default FormErrorMessage;
