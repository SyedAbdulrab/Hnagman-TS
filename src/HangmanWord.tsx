import { Fragment } from "react";

type HangmanWordProps = {
    guessedLetters : string[]
    wordToGuess : string
}
export const HangmanWord = ({guessedLetters,wordToGuess}:HangmanWordProps) => {
 
  console.log(wordToGuess)
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          gap: ".25em",
          fontSize: "6rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        {wordToGuess.split("").map((letter,index) => {
          return (
            <span key={index}  style={{ borderBottom: "10px solid black" }}>
              <span
                style={{
                  visibility: guessedLetters.includes(letter)
                    ? "visible"
                    : "hidden",
                }}
              >
                {letter}
              </span>
            </span>
          );
        })}
      </div>
    </Fragment>
  );
};
