import Header from "./components/Header";
import Main from "./components/MainSection";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";
import useQuiz from "./hooks/useQuiz";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen/>
        )}
      </Main>
    </div>
  );
}