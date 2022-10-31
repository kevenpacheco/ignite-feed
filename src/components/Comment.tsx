import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./styles/Comment.module.css";
import { Avatar } from "./Avatar";
import { ModalDeleteComment } from "./ModalDeleteComment";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface CommentProps {
  id: string;
  content: string;
  publishedAt: Date;
  onDeleteComment: (commentId: string) => void;
}

export function Comment({ id, content, publishedAt, onDeleteComment }: CommentProps) {
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    setIsDeleteComment(true);
  }

  function handleConfirmDeleteComment() {
    onDeleteComment(id);
  }

  function handleCloseCommentModal() {
    setIsDeleteComment(false);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

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
                  title={publishedDateFormatted}
                  dateTime={publishedAt.toISOString()}
                >
                  {publishedDateRelativeToNow}
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
