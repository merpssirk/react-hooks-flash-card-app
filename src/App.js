import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import FlashcardList from "./components/FlashcardList/FlashcardList";

import axios from "axios";

function App() {
  //const [flashcards, setFlashcards] = useState(SampleFlashcards);
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryElement = useRef();
  const amountElement = useRef();
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
      //console.log(res.data);
    });
  }, []);

  useEffect(() => {}, []);

  const codedString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountElement.current.value,
          category: categoryElement.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = codedString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => codedString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: codedString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlform="category">Category</label>
          <select id="category" ref={categoryElement}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlform="amount">Number of Questions</label>
          <input
            type="number"
            id="amont"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountElement}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

/* const SampleFlashcards = [
  {
    id: 1,
    question: "What is 2+2",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "Question 2?",
    answer: "Answer",
    options: ["Answer", "Answer 1", "Answer 2", "Answer 3"],
  },
];
 */

export default App;
