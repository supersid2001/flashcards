import styles from "../styles/Home.module.css";

import Flashcard from "./Flashcard";

const Dashboard = ({ flashcards }) => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flashcard Dashboard</h1>
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} {...flashcard} />
      ))}
    </div>
  );
};

export default Dashboard;
