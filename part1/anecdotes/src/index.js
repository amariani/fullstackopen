import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);

const DisplayAnecdote = ({ title, anecdote, votes }) => (
  <div>
    <h2>{title}</h2>
    <p>{anecdote}</p>
    has {votes} votes
  </div>
);

const App = ({ anecdotes }) => {
  const generateArrayOfZeroes = () => {
    return new Array(anecdotes.length + 1).join("0").split("").map(parseFloat);
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(generateArrayOfZeroes());

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const changeAnecdote = () => {
    setSelected(randomNumber(0, anecdotes.length - 1));
  };

  const voteAnecdote = (anectoteIndex) => {
    const votesCopy = [...votes];
    votesCopy[anectoteIndex] += 1;
    setVotes(votesCopy);
  };

  const getMostVoted = () => {
    const max = Math.max(...votes);
    if (!max) {
      return null;
    }

    let mostVoted;
    votes.forEach((v, index) => {
      if (v === max) {
        mostVoted = index;
      }
    });
    return mostVoted;
  };

  return (
    <div>
      <DisplayAnecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button
        clickHandler={() => voteAnecdote(selected)}
        text="Vote this Anecdote"
      />
      <Button clickHandler={changeAnecdote} text="Next Anecdote" />
      <hr />
      {getMostVoted() && (
        <DisplayAnecdote
          title="Anecdote with most votes"
          anecdote={anecdotes[getMostVoted()]}
          votes={votes[getMostVoted()]}
        />
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
