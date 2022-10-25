import { useEffect, useState } from "react";

import styles from "./App.module.css";
import "./global.css";

import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import { Loader } from "./components/Loader";
import { Button } from "./components/Button";
import { ModalCreatePost, PostType } from "./components/ModalCreatePost";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  function handleCreatePost(newPost: PostType) {
    setPosts((oldState) => {
      const newPosts = [...oldState];
      newPosts.unshift(newPost)
      return newPosts;
    });
  }

  useEffect(() => {
    const timeDelayInSeconds = 1000 * 3;
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, timeDelayInSeconds);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Button onClick={() => setIsCreatingPost(true)}>
            Criar publicação
          </Button>

          {posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}

          {isCreatingPost && (
            <ModalCreatePost
              onClose={() => setIsCreatingPost(false)}
              onCreatePost={handleCreatePost}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
