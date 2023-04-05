import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import words from "./wordlist.json";
import { HangmanDrawing } from "./HangmanDrawaing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (!guessedLetters.includes(letter)) {
        setGuessedLetters((prevState) => [...prevState, letter]);
      }
    },
    [guessedLetters]
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(guessedLetters);
      if (!e.key.match(/^[a-z]$/) || isLoser || isWinner) return;
      else if (!guessedLetters.includes(e.key)) {
        setGuessedLetters((prevState) => [...prevState, e.key]);
      }
    };
    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
  }, [guessedLetters, isLoser, isWinner]);

  return (
    <Fragment>
      <div
        style={{
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          {isWinner && "Winner! - Refresh the page to try again"}
          {isLoser && `You Lost! - the word was "${wordToGuess}"`}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <div style={{ alignSelf: "stretch" }}>
          <Keyboard
            disabled={isWinner || isLoser}
            inactiveLetters={incorrectLetters}
            activeLetters={guessedLetters.filter((letter) => {
              return wordToGuess.includes(letter);
            })}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
// const [wordToGuess,setWordToGuess] = useState(()=>{
//   return words[Math.floor(Math.random()*words.length)]
// })
// const [guessedLetters,SetGetLetters] = useState<string[]>([])
// console.log(wordToGuess)
// return (
//  <Fragment>
//   <div style={{
//     maxWidth:'800px',
//     display:'flex',
//     flexDirection:'column',
//     gap:'2rem',
//     margin:'0 auto',
//     alignItems:'center'
//   }}>

//     <div style={{
//       fontSize:'2rem',
//       textAlign:'center'
//     }}>LOSE OR WIN</div>
// <HangmanDrawing/>
// <HangmanWord/>
// <div style={{alignSelf:'stretch'}}><Keyboard/></div>
//   </div>
//  </Fragment>)

// const todoInputRef = useRef()
// const [showCard,setShowCard] = useState(false)
// const [counter , setCounter] = useState(0)
// const [todoList,setTodoList] = useState<string[]>([])
// const toggleCard = () => {
//   setShowCard(prevstate=>!prevstate)
// }
// const incrementCounter = () => {
//   setCounter(prevstate=>++prevstate)
// }
// const addTodoItem = (newTodo:string) => {
//     setTodoList((prevState)=>{
//       return [...prevState,newTodo]
//     })
// }

// const submitHandler = (event:any) => {
// event.preventDefault()
// console.log('inside submit handler')
// addTodoItem(todoInputRef.current!.value)
// todoInputRef.current!.value = ''
// }
// return (
//   <Fragment>
//     <div
//   onMouseEnter={toggleCard}

//   style={{
//     background:'black',
//     height:!showCard?'10px':'100px',
//   }}>

//   </div>
//   <h1>{counter}</h1>
//   <button type='button' onClick={incrementCounter}>increment counter</button>
//   <h1>Todo List</h1>
//   <form onSubmit={submitHandler}>
//     <label htmlFor="1">Enter you Todo</label>
//     <input ref={todoInputRef} type="text" id='1' />
//     <button type='submit'>Add Todo</button>
//   </form>

//   <div>
//     {todoList.map(todo=>{
//       return <p>-- {todo}</p>
//     })}
//   </div>
//   </Fragment>

// )
