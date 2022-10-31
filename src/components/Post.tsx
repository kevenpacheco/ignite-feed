import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import uuid from "react-uuid";

import styles from "./styles/Post.module.css";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { ContentType, PostType } from "./ModalCreatePost";

interface CommentType {
  id: string;
  content: string;
  publishedAt: Date;
}

export function Post({ author, publishedAt, content }: PostType) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    const newComment = {
      id: uuid(),
      content: commentText,
      publishedAt: new Date(),
    };

    setComments((oldState) => [...oldState, newComment]);
    setCommentText("");
  }

  function deleteComment(commentId: string) {
    const commentsWithoutDeleteOne = comments.filter(
      ({ id }) => id !== commentId
    );

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpty = commentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((block: ContentType[]) => {
          return (
            <div key={JSON.stringify(block)}>
              {block.map((line: ContentType) => {
                if (line.type === "paragraph") {
                  return <p key={line.content}>{line.content}</p>;
                } else if (line.type === "link") {
                  return (
                    <p key={line.content}>
                      <a href="">{line.content}</a>
                    </p>
                  );
                }
              })}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <p>
          <strong>Deixe seu feedback</strong>
        </p>

        <Textarea
          placeholder="Deixe um comentário"
          name="comment"
          value={commentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <Button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </Button>
        </footer>
      </form>

      {!!comments?.length && (
        <div className={styles.commentList}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                onDeleteComment={deleteComment}
                {...comment}
              />
            );
          })}
        </div>
      )}
    </article>
  );
}
