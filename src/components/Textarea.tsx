import { TextareaHTMLAttributes } from 'react';
import styles from './styles/Textarea.module.css';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.wrapper} {...props} />;
}
