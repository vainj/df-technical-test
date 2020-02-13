import React from "react";
import AppSection from './templates/app';

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

        this.title = 'Cerficate generator';

        //TODO: clean this class!
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
     * Renders main application section component
     * @return {AppSection}
     */
    render() {
        return <AppSection title={this.title}/>
    }
}

export default App;