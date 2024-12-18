import { useContext } from "react";
import QuizContext from "../context/QuizContext";

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context)
    throw new Error("QuizContext was used outside the QuizProvider.");
  return context;
}

export default useQuiz;
