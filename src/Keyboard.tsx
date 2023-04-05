import { Fragment } from "react";
import styles from "./Keyboard.module.css";

type KeyboardProps = {
    disabled:boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};
export const Keyboard = ({
    disabled,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) => {
  return (
    <Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(75px,1fr))",
          gap: ".5rem",
        }}
      >
        {KEYS.map((key) => {
          const isInActive = inactiveLetters.includes(key);
          const isActive = activeLetters.includes(key);
          return (
            <button
              disabled={isActive || isInActive || disabled}
              onClick={() => {
                addGuessedLetter(key);
              }}
              className={`${styles.btn} ${isActive ? styles.active : ""} ${
                isInActive ? styles.inactive : ""
              }`}
              key={key}
            >
              {key}
            </button>
          );
        })}
      </div>
    </Fragment>
  );
};

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
