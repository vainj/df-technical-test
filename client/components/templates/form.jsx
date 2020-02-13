import React from "react";
import Button from '@material-ui/core/Button';

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
        <Button variant="contained" color="primary" id="btnSubmit" onClick={handleButtonClick}>
            Calculate Name Length
        </Button>
        <Button variant="contained" color="primary" id="btnReset" onClick={handleReset}>
            Reset All
        </Button>
        <hr/>
        <p>{state.msg}</p>
    </section>
);

export default Form;