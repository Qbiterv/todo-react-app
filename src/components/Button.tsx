type Props = {
  children: string;
  type: "reset" | "button" | "submit";
  onClick: () => void;
};

const Button = ({ type, children, onClick }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
