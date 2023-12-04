import {useEffect, useState} from 'react';
import Dashboard from "../components/Dashboard";
import AddFlashcard from "../components/AddFlashcard";
import styles from "../styles/Home.module.css";
import PlusButton from "../components/PlusButton";
import { useRouter } from 'next/router';

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();
    async function getData(){
      const res = await fetch("https://droptableteam-cswavrsn5q-ue.a.run.app/get_translation_history/?id=" + localStorage.getItem('id'))
      return res.json()
    }
  
    useEffect(() => {
      console.log(localStorage.getItem('id'))
      if (!localStorage.getItem('id')) {
        router.push('/home'); 
        return;
      } else {
      getData().then((translationHistory) => {
        console.log(translationHistory.message)
        var data = JSON.parse(translationHistory.message)
        setFlashcards(prevFlashcards => [
          ...prevFlashcards,
          ...data.translationData.map((entry, index) => ({
            term: entry.outputText,
            definition: entry.inputText,
            id: index + 1, 
          })),
        ]);
      })
    }
        
    }, [])

  const handleAddFlashcard = (newFlashcard) => {
    setFlashcards([
      ...flashcards,
      { ...newFlashcard, id: flashcards.length + 1 },
    ]);
  };

  return (
    <div className={styles.container}>
      <PlusButton onAddFlashcard={handleAddFlashcard} />
      <Dashboard flashcards={flashcards} />
    </div>
  );
};

export default Home;
