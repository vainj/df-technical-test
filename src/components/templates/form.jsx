import React from "react";

/**
 * Form component template
 * @param {String} state
 * @param {Function} handleTextChange
 * @param {Function} handleButtonClick
 * @param {Function} handleReset
 * @return {Form}
 * @constructor
 */
const Form = ({state, handleTextChange, handleButtonClick, handleReset}) => (
    <section>
        <label>Your name </label>
        <input
            type="text"
            id="txtName"
            name="txtName"
            value={state.name}
            onChange={handleTextChange}
        />
        <button id="btnSubmit" onClick={handleButtonClick}>
            Calculate Name Length
        </button>
        <button id="btnReset" onClick={handleReset}>
            Reset All
        </button>
        <hr/>
        <p>{state.msg}</p>
    </section>
);

export default Form;