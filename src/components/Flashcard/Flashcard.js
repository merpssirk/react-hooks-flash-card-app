import React, { useEffect, useRef, useState } from "react";

export default function Flashcard({ flashcard }) {
    
    const [flipCard, setFlipCard] = useState( false );

    const [height, setHeight] = useState('initial')
    
    const frontElement = useRef()
    const backElement = useRef()

    /* function setMaxHeight () {

        const frontHeight = frontElement.target.getBoundingClientReact().height

        const backHeight = backElement.target.getBoundingClientReact().height

        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])

    useEffect( () => {

        window.addEventListener( 'resize', setMaxHeight )

        return () => window.removeEventListener( 'resize', setMaxHeight )
        
    }, []) */
    
  return (
    <div
          className={`card ${flipCard ? "flipCard" : ""}`}
         /*  style={{height: height }} */
      onClick={() => setFlipCard(!flipCard)}
    >
      <div className="front" ref={frontElement}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return <div className="flashcard-option" key={option}>{option}</div>;
          })}
        </div>
      </div>
      <div className="back" ref={backElement}>{flashcard.answer}</div>
    </div>
  );
}
