import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "reset" | "button" | "submit";
  onClick: () => void;
};

export const Button = ({ type, children, onClick }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
