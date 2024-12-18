import useQuiz from "../hooks/useQuiz";

function Progress() {
  const { index, points, answer, numQuestions, maxPossiblePoints } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
