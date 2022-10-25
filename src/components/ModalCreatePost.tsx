import { useState } from "react";
import uuid from "react-uuid";

import styles from "./ModalCreatePost.module.css";

import { ModalBase } from "./ModalBase";
import { Textarea } from "./Textarea";
import { Button } from "./Button";

export interface ContentType {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: ContentType[][];
}

interface ModalCreatePostProps {
  onClose: () => void;
  onCreatePost: (newPost: PostType) => void;
}

export function ModalCreatePost({
  onClose,
  onCreatePost,
}: ModalCreatePostProps) {
  const [content, setContent] = useState("");

  function createPost() {
    const contentGroups = content.split("\n\n");

    const formattedContent: ContentType[][] = contentGroups.map((block) =>
      block.split("\n").map((paragraph) => ({
        type: "paragraph",
        content: paragraph,
      }))
    );

    const newPost: PostType = {
      id: uuid(),
      author: {
        name: "Keven Pacheco",
        role: "Web Developer",
        avatarUrl: "https://github.com/kevenpacheco.png",
      },
      content: formattedContent,
      publishedAt: new Date(),
    };
    onCreatePost(newPost);
    onClose();
  }

  return (
    <ModalBase style={{ width: "100%", maxWidth: "520px" }}>
      <div className={styles.wrapper}>
        <h2>Criar publicação</h2>

        <Textarea
          value={content}
          onChange={({ target }) => setContent(target.value)}
          placeholder="No que você está pensando?"
        />

        <div className={styles.buttons}>
          <Button variant="link" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={createPost} disabled={!content.length}>
            Publicar
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
