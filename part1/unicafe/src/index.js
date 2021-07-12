import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);

const StatItem = ({ text, value, extra }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {extra}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const positivePercent = (good * 100) / all;
  const total = good - bad;
  const average = total / all;

  if (all === 0) {
    return <h2>No feedback given</h2>;
  }

  return (
    <div>
      <h3>Statistics</h3>
      <hr />
      <table>
        <tbody>
          <StatItem text="Good" value={good} />
          <StatItem text="Neutral" value={neutral} />
          <StatItem text="Bad" value={bad} />
          <StatItem text="All" value={all} />
          <StatItem text="Average" value={average} />
          <StatItem text="Positive" value={positivePercent} extra="%" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
