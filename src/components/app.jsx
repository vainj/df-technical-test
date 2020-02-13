import React from "react";
import Form from './templates/form';

/**
 * Main React component application
 */
class App extends React.Component {
    /**
     * App constructor
     */
    constructor() {
        super();

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleTextChange  = this.handleTextChange.bind(this);
        this.handleReset       = this.handleReset.bind(this);

        this.state = {
            name : '',
            msg  : ''
        };
    }

    /**
     * Sets `msg` state on button click
     * @param {Event} e
     * @return {void}
     */
    handleButtonClick = e => {
        const nameLen = this.state.name.length;
        if (nameLen > 0) {
            this.setState({
                msg : `You name has ${nameLen} characters including space`
            });
        }
    };

    /**
     * Sets `name` state on text change
     * @param {Event} e
     * @return {void}
     */
    handleTextChange = e => {
        this.setState({name : e.target.value});
    };

    /**
     * Resets `msg` state on reset button click
     * @param {Event} e
     * @return {void}
     */
    handleReset = () => {
        this.setState({name : '', msg : ''});
    };

    /**
     * Renders form component
     * @return {Form}
     */
    render() {
        return <Form
            state={this.state}
            handleTextChange={this.handleTextChange}
            handleButtonClick={this.handleButtonClick}
            handleReset={this.handleReset}
        />;
    }
}

export default App;