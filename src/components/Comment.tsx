import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./styles/Comment.module.css";
import { Avatar } from "./Avatar";
import { ModalDeleteComment } from "./ModalDeleteComment";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    setIsDeleteComment(true);
  }

  function handleConfirmDeleteComment() {
    onDeleteComment(content);
  }

  function handleCloseCommentModal() {
    setIsDeleteComment(false);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <>
      <div className={styles.comment}>
        <Avatar src="https://github.com/kevenpacheco.png" hasBorder={false} />

        <div className={styles.commentBox}>
          <div className={styles.commentContent}>
            <header>
              <div className={styles.authorAndTime}>
                <strong>Keven Pacheco</strong>
                <time
                  title="11 de maio às 11:13"
                  dateTime="2022-05-11 08:13:30"
                >
                  Cerca de 1h atrás
                </time>
              </div>

              <button onClick={handleDeleteComment} title="Deletar comentário">
                <Trash size={24} />
              </button>
            </header>

            <p>{content}</p>
          </div>

          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp />
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>
        </div>
      </div>

      {isDeleteComment && (
        <ModalDeleteComment
          onConfirmDeleteComment={handleConfirmDeleteComment}
          onClose={handleCloseCommentModal}
        />
      )}
    </>
  );
}
