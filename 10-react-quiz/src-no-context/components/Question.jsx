import Options from "./Options";

/* eslint-disable react/prop-types */

function Question({ question, dispatch, answer }) {
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
