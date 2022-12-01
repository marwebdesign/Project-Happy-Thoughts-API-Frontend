import React from 'react';

const ThoughtForm = ({ newTodo: newThought, onNewThoughtChange, onFormSubmit }) => {
  return (
    <form
      onSubmit={onFormSubmit}
      className="thoughtForm">
      <h1 className="thoughtHeading">What is making you happy right now?</h1>
      <textarea
        className="thoughtTextArea"
        value={newThought}
        onChange={onNewThoughtChange}
        type="text"
        maxLength="140"
        placeholder="Insert happy thoughts here <3" />

      {/* <p className="maxLength"> {140 - newThought.length}  characters left</p> */}
      <button
        className="thoughtBtn"
        type="submit">❤️ Send Happy Thought ❤️
      </button>
    </form>
  )
}

export default ThoughtForm;