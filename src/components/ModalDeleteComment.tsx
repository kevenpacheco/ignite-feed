import styles from "./styles/ModalDeleteComment.module.css";
import { ModalBase } from "./ModalBase";

interface ModalDeleteCommentProps {
  onClose: () => void;
  onConfirmDeleteComment: () => void;
}

export function ModalDeleteComment({
  onClose,
  onConfirmDeleteComment
}: ModalDeleteCommentProps) {
  return (
    <ModalBase>
      <div className={styles.wrapper}>
        <h2>Excluir comentário</h2>
        <p>Você tem certeza que gostaria de excluir este comentário?</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirmDeleteComment}>Sim, excluir</button>
        </div>
      </div>
    </ModalBase>
  );
}
