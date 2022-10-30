import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles/Button.module.css";

const VARIANTS_MAPPER = {
  primary: styles.button,
  link: styles.buttonLink
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
