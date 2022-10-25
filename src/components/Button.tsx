import { ButtonHTMLAttributes, ReactNode } from "react";
import primaryStyles from "./Button.module.css";
import linkStyles from "./ButtonLink.module.css";

const VARIANTS_MAPPER = {
  primary: primaryStyles.button,
  link: linkStyles.button
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof VARIANTS_MAPPER;
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={VARIANTS_MAPPER[variant]} {...props}>
      {children}
    </button>
  );
}
