import styles from "../styles/Home.module.css";

import { useState, useEffect, useRef } from "react";

 
const AddFlashcard = ({ onAdd, onClose }) => {
  const [term, setTerm] = useState("");
  const [langTo, setLangTo] = useState("spa");
  const [langFrom, setLangFrom] = useState("en");
  const [image, setImage] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const  handleCreate = async () => {
    console.log(langTo)
    console.log(langFrom)
    if (!term && !image) {
      alert("Please fill in either the term or upload an image");
      return;
    }
    if(!langTo){
      alert("Please fill in langauge to");
      return;
    }
    if(!langFrom){
      alert("Please fill in langauge from");
      return;
    }
    if(langTo == langFrom){
      alert("Please select two different languages");
      return;
    }
    else if(!image){
      var link = "http://localhost:18080/post_translation_to_client/?tbt=" + term + "&tl=" + langTo + "&fl=" + langFrom + "&id=" + localStorage.getItem('id')
      fetch(link, {
        method: 'POST'
      }).then((result) => {
        result.json().then((resJSON) => {
          console.log(resJSON)
          var definition = resJSON.textToBeTranslated
          onAdd({ term: resJSON.translatedText || "", definition: definition});
        })
      })
    } else {
      var link = "http://localhost:18080/post_image_translation/?&tl=" + langTo + "&fl=" + langFrom + "&id=" + localStorage.getItem('id')
      const formData = new FormData()
      formData.append('file', image);
      fetch(link, {
        method: 'POST',
        body: formData
      }).then((result) => {
        console.log(link)
        result.json().then((resJSON) => {
          console.log(resJSON)
          var definition = resJSON.textToBeTranslated
          onAdd({ term: resJSON.translatedText || "", definition: definition});
        })
      })
    }
    setTerm("");
    setImage(null);
    onClose();
  };

  const handleLangFromChange = (e) => {
    console.log("Selected language from:", e.target.value);
    setLangFrom(e.target.value);
  };

  const handleLangToChange = (e) => {
    console.log("Selected language from:", e.target.value);
    setLangTo(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className={styles.modalContainer} ref={modalRef}>
      <div className={styles.modal}>
        <h2 className={styles.subtitle}>Add Flashcard</h2>
        <label className={styles.label}>
          Term:
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter term"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Language to:
          <select id="langToSelect" onChange={handleLangToChange} value={langTo}>
            <option value="en">English</option>
            <option value="spa">Spanish</option>
            <option value="de">Dutch</option>
          </select>
        </label>
        <label className={styles.label}>
          Language from:
          <select id="langFromSelect" onChange={handleLangFromChange} value={langFrom}>
            <option value="en">English</option>
            <option value="spa">Spanish</option>
            <option value="de">Dutch</option>
          </select>
        </label>
       

        <label className={styles.label}>
          Upload Image:
          <input
            type="file"
            accepts="image/*"
            onChange={handleImageChange}
            className={styles.input}
          />
        </label>
        <button onClick={handleCreate} className={styles.button}>
          Create
        </button>
        <button onClick={onClose} className={styles.button}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddFlashcard;
