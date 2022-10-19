import styles from "./ModalDeleteComment.module.css";

interface ModalDeleteCommentProps {
  onClose: () => void;
  onConfirmDeleteComment: () => void;
}

export function ModalDeleteComment({
  onClose,
  onConfirmDeleteComment
}: ModalDeleteCommentProps) {
  return (
    <div className={styles.ModalDeleteComment}>
      <div className={styles.container}>
        <h2>Excluir comentário</h2>
        <p>Você tem certeza que gostaria de excluir este comentário?</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirmDeleteComment}>Sim, excluir</button>
        </div>
      </div>
    </div>
  );
}
