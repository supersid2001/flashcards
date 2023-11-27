import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const Flashcard = ({ term, definition, image }) => {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <div className={styles.flashcard}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image src={imageUrl} alt="Uploaded" width={400} height={300} />
        </div>
      )}
      <h3>{term}</h3>
      <p>{definition}</p>
    </div>
  );
};

export default Flashcard;
