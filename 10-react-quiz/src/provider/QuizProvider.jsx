import { useEffect, useReducer } from "react";
import QuizContext from "../context/QuizContext";

const initialState = {
  questions: [],
  // "loading", "ready", "active", "error", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemining: state.secondsRemining - 1,
        status: state.secondsRemining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

// eslint-disable-next-line react/prop-types
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.log(err);
      }
    })();
  }, [dispatch]);

  return (
    <QuizContext.Provider
      value={{ ...state, numQuestions, maxPossiblePoints, dispatch }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
