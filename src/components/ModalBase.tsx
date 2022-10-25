import { HTMLAttributes, ReactNode, useEffect } from "react";
import styles from "./ModalBase.module.css";

interface ModalBasePropsType extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function ModalBase({ children, ...props }: ModalBasePropsType) {
  useEffect(() => {
    const HTMLElement = document.querySelector('html');
    if (HTMLElement) {
      HTMLElement.style.overflow = 'hidden';
      
      return () => {
        HTMLElement.style.overflow = 'auto';
      }
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} {...props}>
        {children}
      </div>
    </div>
  );
}
