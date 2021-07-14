import React from "react";

const Form = ({
  submitHandler,
  nameValue,
  phoneValue,
  nameChangeHandler,
  numberChangeHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <h3>Add New</h3>
      <div>
        name: <input value={nameValue} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit" disabled={!nameValue || !phoneValue}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
